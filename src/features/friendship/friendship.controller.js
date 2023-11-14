import FriendshipRepository from "./friendship.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
const friendshipRepository = new FriendshipRepository();

export default class FriendshipController{
    async getFriends(req, res) {
        const userId = req.params.userId;

        try {
            const friends = await friendshipRepository.getUserFriends(userId);
            res.status(200).send(friends );
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }
    
    async  getPendingRequests(req, res) {
        const userId = req.params.userId;

        try {
            const pendingRequests = await friendshipRepository.getPendingFriendRequests(userId);
            res.status(200).send(pendingRequests );
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }
    
    async  toggleFriendship(req, res) {
        const friendId = req.params.friendId;

        try {
            const result = await friendshipRepository.toggleFriendship(req.userID, friendId);
            res.status(200).send( result );
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }
    
    async  respondToRequest(req, res) {
        const friendId = req.params.friendId;
        const accept = req.body.accept; // Assuming you pass 'accept' or 'reject' in the request body

        try {
            const result = await friendshipRepository.respondToRequest(req.userID, friendId, accept);
            res.status(200).send( result );
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }
}
