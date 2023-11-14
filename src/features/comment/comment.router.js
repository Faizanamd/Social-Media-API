import express from 'express';
import CommentController from './comment.controller.js';

const commentRouter = express.Router();
const commentController = new CommentController();


commentRouter.post('/:postId', (req, res) => {
    commentController.postCommentByPostIdCon(req, res);
})

commentRouter.get('/:postId', (req, res) => {
    commentController.getCommentByPostIdCon(req, res);
})


commentRouter.delete("/:commentId", (req, res) => {
    commentController.deteteCommentbyId(req, res);
})

commentRouter.put("/:commentId", (req, res) => {
    commentController.updateCommentByIdCon(req, res);
})


export default commentRouter;