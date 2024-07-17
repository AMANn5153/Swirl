import mongoose  from "mongoose";



const connectToDB= async (DB) => {
    try{
        if(!DB){
            throw new Error("MONGODB_URI is not set")
        }
        await mongoose.connect(DB);
        console.log("connected to DATABASE");
    }catch(e){
        console.log(e);
    }
}

export default connectToDB;