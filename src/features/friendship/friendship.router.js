

import express from 'express';
const friendshipRouter= express.Router();

import FriendshipController from './friendship.controller.js';
const friendshipController = new FriendshipController();
friendshipRouter.get('/get-friends/:userId', (req,res)=>{
    friendshipController.getFriends(req, res);
});
friendshipRouter.get('/get-pending-requests', (req, res)=>{
    friendshipController.getPendingRequests(req,res);
});
friendshipRouter.get('/toggle-friendship/:friendId', (req, res)=>{
    friendshipController.toggleFriendship(req,res);
});
friendshipRouter.post('/response-to-request/:friendId', (req, res)=>{
    friendshipController.respondToRequest(req, res);
});


export default friendshipRouter;