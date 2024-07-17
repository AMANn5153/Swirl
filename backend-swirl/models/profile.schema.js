import mongoose from "mongoose"


const profile = new mongoose.Schema({
    
    name :{
        type: String,
        required: true
    },

    profilePic: {
        type : String,
        default:""
    },

    username:{
        type : String,
        required : true,
        unique : true
    },

    gender:{
        type:String,
        required:true,
        enum:["Male", "Female"]
    },

    email:{
        type : String,
        required : true
    },

    password :{
        type : String,
        required:true,
        minlength:6
        
    },

    tokens : [
        {
            type: String
        }
    ]
    
},{timestamps:true});

const Profile =  mongoose.model('Profile', profile);

export default Profile;
