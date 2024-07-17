import express from "express";
import passport from "passport"
import  '../controller/auth.google.controller.js';
import login, {signUp, logout} from "../controller/auth.controller.js";
import dotenv from "dotenv";
import generateTokenAndSetCookie from "../util/generate.token.js";


dotenv.config();

const router = express.Router();



router.post("/login", login );

router.post("/signup", signUp );

router.get("/logout", logout);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] ,prompt:"select_account"}));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      console.log("Error occurred in Google authentication:", err);
      return res.redirect(`http://localhost:3000/Login?error=${encodeURIComponent(err.message)}`);
    }

    req.logIn(user, { session: false }, (err) => {
      if (err) {
        console.log("Error occurred during login:", err);
        return res.redirect(`http://localhost:3000/Login?error=${encodeURIComponent('An error occurred during login')}`);
      }

      // Generate JWT token and set cookie
      generateTokenAndSetCookie(user._id, res);


      // Redirect to frontend with user data as query parameters
      const userData = encodeURIComponent(JSON.stringify({
        _id: user._id,
        name: user.name,
        username: user.username,
        profilePic: user.profilePic,
        email: user.email,
      }));

      res.redirect(`http://localhost:3000/signup?user=${userData}`);
    });
  })(req, res, next);
});


// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

//   router.get('/google/callback', (req, res, next) => {
//     passport.authenticate('google', (err, user, info) => {
//       if (err) {
//         console.log("Error occurred in Google authentication:", err);

//          res.status(409).json({ error: err.message});
//       }
//         // User is authenticated successfully, perform login and redirect
//       req.logIn(user, { session: false }, (err) => {
//         if (err) {
//           console.log("Error occurred during login:", err);
//            res.status(500).json({ error: 'An error occurred during login' });
//         }
  
//         // Generate JWT token and set cookie
//         generateTokenAndSetCookie(user._id, res);
//         res.status(201).json({
//           _id : user._id,
//           name : user.name,
//           username : user.username,
//           profilePic: user.profilePic,
//           email : user.email,
//       });// send user information
//       });
//     })(req, res, next); // Ensure to pass req, res, next to authenticate callback
//   });

  
export default  router;