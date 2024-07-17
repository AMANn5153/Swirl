import dotenv from "dotenv";

dotenv.config();

import passport from "passport"
import express from "express";
import cors from "cors";
import router from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import connectToDB  from "./db/connection.db.js"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import { server, app} from "./socket/socket.js";

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000/', // Replace with your client origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(cors({ origin : true }));
app.use(cookieParser());

app.use(passport.initialize());

app.use("/api", userRouter)

app.use("/api/auth", router);

app.use("/api/message", messageRouter);

const DB = process.env.MONGODB_URI;

server.listen(3001, ()=>{
    connectToDB(DB);
    console.log("connected to port 3001");
});