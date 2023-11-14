
import { ApplicationError } from "../../error-handler/applicationError.js";
import CommentModel from "./comment.schema.js";
import { ObjectId } from "mongodb";
export default class CommentRepository {
    async getCommentByPostIdRepo(id) {
        try {
            const result = await CommentModel.findOne({ postID: new ObjectId(id) });
            console.log(result);
            return result;

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }

    }

    async postCommentByPostIdRepo(comment) {
        console.log(comment);
        try {
            const newComment = new CommentModel(comment);
            await newComment.save();
            return newComment;

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async deteteCommentbyIdRepo(commentId) {
        console.log(commentId);
        try {

            return result;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }

    }

    async updateCommentByIdRepo(commentId, content) {
        // console.log(commentId);

        // console.log(content);
        try {
            const updateComment = await CommentModel.findOne({ _id: commentId });
            // console.log(updateComment);
            if (content) {
                updateComment.content = content;
            }
            await updateComment.save();
            return updateComment;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }
}


