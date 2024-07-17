import Googleprofile from "../models/googleOAuth.schema.js";
import Profile from "../models/profile.schema.js";


const getUsers = async( req, res) => {
    try{
        const loggedUser = req.user._id; 

        const users = await Profile.find({_id : {$ne : loggedUser}
        }, {password : 0});

        const googleUsers = await Googleprofile.find({_id: {$ne : loggedUser}});

        const combinedUsers = [...users, ...googleUsers];
       

        res.status(200).send({combinedUsers});
    }
    catch(e){
        console.log("error in user controller", e.message);
        res.status(500).json({"error" : "Internal Server Error"});
    }
}


export default getUsers;