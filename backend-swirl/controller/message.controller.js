import Conversation from "../models/conversation.schema.js";
import Message from "../models/message.schema.js";
import mongoose from "mongoose";
import { getRecevier, io } from "../socket/socket.js";

const sendMessage = async(req, res) => {
    try{
        const  message = req.body.message;
        const  {id : receiverId} = req.params;
        const  senderId = req.user._id;
        let senderObjectId = new mongoose.Types.ObjectId(senderId);
        let receiverObjectId = new mongoose.Types.ObjectId(receiverId);


        let conversation = await Conversation.findOne({participants : {$all : [senderObjectId, receiverObjectId]}});
        
        if(!conversation){
            conversation = await Conversation.create({
                participants :[senderObjectId, receiverObjectId],
                message:[]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });




        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        Promise.all([newMessage.save(), conversation.save()]);
        

        const id = getRecevier(receiverId);

        if(id){
            io.to(id).emit("sendMessage", newMessage);
        }

        res.status(201).json(newMessage);
        

    }
    catch(e){
        console.log("error is send message controller :" , e);
        res.status(501).json({"error" : "Internal Server Error"});
    }
}


export const getMessage = async( req, res ) => {
    try{
        const userToFindId = new mongoose.Types.ObjectId(req.params.userToFind);
        const senderId = new mongoose.Types.ObjectId(req.user._id);

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToFindId]}
        }).populate("messages");
        if(!conversation){
            res.status(200).json([]);
        }else{
        res.status(200).json(conversation.messages);
        }
    }catch(e){
        console.log("error in message controller", e.message);
        res.status(500).json({"error" : "Internal Server Error"});
    }
}


export default sendMessage;
