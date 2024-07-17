import mongoose from "mongoose"


const googleprofile = new mongoose.Schema({
    
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
        enum:["Male", "Female"]
    },

    email:{
        type : String,
        required : true
    },

    tokens : [
        {
            type: String
        }
    ]
    
},{timestamps:true});

const Googleprofile =  mongoose.model('Googleprofile', googleprofile);

export default Googleprofile;
