import jwt from "jsonwebtoken";
import Profile from "../models/profile.schema.js";
import Googleprofile from "../models/googleOAuth.schema.js";


const protectRoute = async  (req, res,next) => {
    // retrive token from cookie

    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error : " unauthorized : you're not logged in "})
        }

        const decode = jwt.verify(token, process.env.SECRET);

        if(!decode){
           return res.status(401).json({error : "Not a valid Token"});
        }

        let user = await Profile.findById(decode.userId).select("-password");

        if(!user){
            user = await Googleprofile.findById(decode.userId);
        }

        if(!user){
           return res.status(404).json({error : " User not found"});
        }
        

        req.user = user;
        next();
    }
    catch(e){
        console.log("error in protectRoute middleware", e.message);
        res.status(500).json({error: "Internal server Error"});
    }
}
   

export default protectRoute;

