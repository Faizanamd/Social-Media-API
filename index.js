
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
app.use(express.json());
app.use(express.static('public'));
import jwtAuth from './src/middleware/jwt.middleware.js';

//Importing different routes
import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/post/post.routes.js';
import commentRouter from './src/features/comment/comment.router.js';
import friendshipRouter from './src/features/friendship/friendship.router.js';
import likeRouter from './src/features/like/like.routes.js';
import otpRouter from './src/features/otp/otp.routes.js';
app.use("/api/users", userRouter);
app.use("/api/posts", jwtAuth, postRouter);
app.use("/api/comments", jwtAuth,  commentRouter);
app.use('/api/friends',jwtAuth,  friendshipRouter);
app.use("/api/likes", jwtAuth, likeRouter);
// app.use(express.json());
app.use("/api/otp", jwtAuth, otpRouter);
app.get("/",(req, res) =>{
    res.send("Welcome to Social Media API");
})


export default app;
