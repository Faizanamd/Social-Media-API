import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import LikeModel from "./like.schema.js";
export default class LikeRepository {

    async getLikesForPost(postId) {
        console.log(postId);
        const result = await LikeModel.find({ postOrCommentId: new ObjectId(postId) });
        console.log(result);
        return result;
    }

    async toggleLike(postId, userId) {
        const existingLike = await LikeModel.findOne({ postOrCommentId: new ObjectId(postId), userID: new ObjectId(userId) });

        if (existingLike) {
            await Like.findByIdAndRemove(existingLike._id);
            return 'Like removed';
        } else {
            const newLike = new LikeModel({ userId: userId, postOrCommentId: postId });

            await newLike.save();
            return 'Like added';
        }
    }


}