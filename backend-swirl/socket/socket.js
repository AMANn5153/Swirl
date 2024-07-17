import http from 'http';
import {Server} from 'socket.io';
import express, { query } from "express";
const app = express();

// express
//export app
//create server http server pass down app into it
//create socket-io server and pass down hhtpserver into it also pass cors as option
// perform io.on("conncection", (socket)=>{
 //   })

 const server = http.createServer(app);
 const io = new Server(server,{
    cors: {
        origin: 'http://localhost:3000', // Replace with your client origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
        allowedHeaders: 'Content-Type,Authorization', // Allowed headers
        credentials: true, // Allow cookies and authentication headers
    }
 });


 const onlineUsers = {} // contains online users;

 export const getRecevier = (id)=>{
    return onlineUsers[id];
 }
 io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;

    if(userId != "undefined"){
        onlineUsers[userId] = socket.id;
    }

    //this will send all users the map of online users where userId : socketId
    console.log(onlineUsers[userId]);
    io.emit("getOnlineUsers",Object.keys(onlineUsers));

    // listing to event
    socket.on("disconnect", ()=>{
        console.log("disconnected", socket.id);
        delete onlineUsers[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsers));
    });
 });

 export {app, server, io};

