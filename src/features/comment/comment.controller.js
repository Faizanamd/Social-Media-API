import CommentRepository from "./comment.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const commentRepository = new CommentRepository();
export default class CommentController {
    async getCommentByPostIdCon(req, res) {
        const postId = req.params.postId;
        console.log("fdfwerq", postId);
        try {
            const result = await commentRepository.getCommentByPostIdRepo(postId);
            if (!result) {
                res.status(404).send("Comment not found");
            } else {
                res.status(200).send(result);
            }
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).json({ error: err.message });
            } else {
                console.log(err);
                res.status(500).json({ error: "Something went wrong" });
            }
        }
    }

    async postCommentByPostIdCon(req, res) {
        const { content } = req.body;
        const postID = req.params.postId;
        const userID = req.userID;
        console.log("fdfwerq", postID);
        const newComment = { userID, postID, content };
        console.log(newComment)
        try {
            const reuslt = await commentRepository.postCommentByPostIdRepo(newComment);
            res.status(400).send(reuslt);
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).json({ error: err.message });
            } else {
                console.log(err);
                res.status(500).json({ error: "Something went wrong" });
            }
        }
    }
    async deteteCommentbyId(req, res) {
        const commentId = req.params.commentId;
        // console.log(commentId);
        try{
            const result = await commentRepository.deteteCommentbyIdRepo(commentId);
            if(!result){
                res.status(404).send("Comment not found");
            }else{
                res.status(201).send("comment delted successfully");
            }
        }
        catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send( err.message );
            } else {
                console.log(err);
                res.status(500).send("Something went wrong" );
            }
        }
    }

    async updateCommentByIdCon(req, res) {
        const commentId = req.params.commentId;
        console.log(commentId);
        const {content} = req.body;
        try{
            const result = await commentRepository.updateCommentByIdRepo(commentId, content);
            if(!result){
                res.status(404).send("Comment not found");
            }else{
                res.status(200).send(result);
            }
        }catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send( err.message );
            } else {
                console.log(err);
                res.status(500).send("Something went wrong" );
            }
        }
    }
}