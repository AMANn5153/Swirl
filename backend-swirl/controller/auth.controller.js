
import Profile from '../models/profile.schema.js'
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../util/generate.token.js';
import Googleprofile from '../models/googleOAuth.schema.js';


export const  signUp = async (req, res)=>{
    try {
        const  {username, password, confirmPassword, profilePic, email, name, gender} = req.body;

        if(password !== confirmPassword){
            res.status(400).json({error:"password dosen't match"});
        }
 
        const checkEmail = await Profile.findOne({email});

        if( checkEmail){
            res.status(400).json({error:"email already registered"});
        }

        const check = await Googleprofile.findOne({email});

        if(check){
            res.status(400).json({error:"email already registered"});
        }

        const checkUserName = await Profile.findOne({username});

        if(checkUserName){
            res.status(400).json({error:"username already exists"});
        }

        //Hash the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyAvatar = "https://avatar.iran.liara.run/public/boy?username=${username}";
        const girlAvatar = "https://avatar.iran.liara.run/public/girl?username=${username}";

        const user = new Profile({
            username,
            profilePic : gender == "Male" ? boyAvatar : girlAvatar,
            gender,
            name, 
            email,
            password : hashedPassword
        });

        if(user){
            
            await generateTokenAndSetCookie(user._id, res);
            await user.save();

            res.status(201).json({
                _id : user._id,
                name : user.name,
                username : user.username,
                profilePic: user.profilePic,
                email : user.email,
            });

        }else{
            res.status(400).json({error : "Invalid user data"});
        }
  
     }
     catch(e){
        console.log("Error in signup controller", e.message);
        res.status(500).json({error:"Internal server error"});
     }
}



const login = async (req, res)=>{
    try {
        const  {email , password} = req.body;
        
        const user = await Profile.findOne({email});
        const passCheck = await bcrypt.compare(password, user?.password || "");

        if(!user || !passCheck){
            res.status(400).json({error:"user credentials are wrong"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id : user._id,
            username : user.username,
            profilePic : user.profilePic,
            fullname : user.name
        })

        
    }
    catch(e){
        console.log("error in login controller", e.message);
        res.status(500).json({"error" : "Internal Server Error"});
    }
}




export const  logout = (req, res)=>{
    res.clearCookie("jwt");
    res.status(200).json({"message": "logged out"})
}




export default login;


