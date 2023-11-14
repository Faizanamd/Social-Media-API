
import FriendshipModel from "./friendship.schema.js";
import  { ObjectId } from 'mongodb'
export default class FriendshipRepository {
    async getUserFriends(userId) {
        try {
            const friendships = await FriendshipModel.find({
                $or: [{ user1: new ObjectId(userId) }, { user2: new ObjectId(userId) }],
                status: 'accepted',
            })
                .populate('user1', 'username')
                .populate('user2', 'username')
                .exec();

            // Extract user information from the populated fields
            const userFriends = friendships.map((friendship) => {
                const otherUser = friendship.user1.toString() === userId.toString() ? friendship.user2 : friendship.user1;
                return {
                    userId: otherUser._id,
                    username: otherUser.username,
                    // Add more user fields as needed
                };
            });

            return userFriends;
        } catch (error) {
            throw new Error('Error fetching user friends');
        }
    }

    async getPendingFriendRequests(userId) {
        try {
            const pendingRequests = await FriendshipModel.find({
                user2: userId,
                status: 'pending',
            })
                .populate('user1', 'username')
                .exec();

            // Extract user information from the populated fields
            const pendingRequestsData = pendingRequests.map((request) => {
                return {
                    userId: request.user1._id,
                    username: request.user1.username,
                    // Add more user fields as needed
                };
            });

            return pendingRequestsData;
        } catch (error) {
            throw new Error('Error fetching pending friend requests');
        }
    }

    async toggleFriendship(userId, friendId) {
        try {
            const existingFriendship = await FriendshipModel.findOne({
                $or: [
                    { user1: userId, user2: friendId },
                    { user1: friendId, user2: userId },
                ],
            });

            if (existingFriendship) {
                // Friendship exists, update status
                existingFriendship.status = existingFriendship.status === 'accepted' ? 'pending' : 'accepted';
                return existingFriendship.save();
            } else {
                // Friendship doesn't exist, create a new one
                const newFriendship = new FriendshipModel({
                    user1: new ObjectId(userId),
                    user2: new ObjectId(friendId),
                    status: 'pending',
                });
                return newFriendship.save();
            }
        } catch (error) {
            throw new Error('Error toggling friendship');
        }
    }

    async respondToRequest(userId, friendId, accept) {
        try {
            console.log('Responding to friend request:', userId, friendId, accept);

            const existingRequest = await FriendshipModel.findOne({
                user1: new ObjectId(friendId),
                user2: new ObjectId(userId),
                status: 'pending',
            });

            if (!existingRequest) {
                console.error('Friend request not found:', userId, friendId);
                throw new Error('Friend request not found');
            }

            if (accept) {
                // Accept the friend request
                existingRequest.status = 'accepted';
                return existingRequest.save();
            } else {
                // Reject the friend request
                return existingRequest.remove();
            }
        } catch (error) {
            console.error('Error responding to friend request:', error);
            throw new Error('Error responding to friend request');
        }
    }



}