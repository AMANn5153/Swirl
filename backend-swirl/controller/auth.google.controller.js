import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from "dotenv";
import Googleprofile from '../models/googleOAuth.schema.js';
import Profile from '../models/profile.schema.js'

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await Profile.findOne({email :  profile.emails[0].value});
      
      if(user){
        return done( new Error("Email Registered Using Forms"), user);
      }

      user = await Googleprofile.findOne({ email : profile.emails[0].value });
      
      if (!user) {
        user = new Googleprofile({
          username: profile.emails[0].value.split('@')[0],
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
          name: profile.displayName,
          gender:profile.gender
        });
        await user.save();
      }
  
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Googleprofile.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });