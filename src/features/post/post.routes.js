
import express from 'express'
import { upload } from '../../middleware/file-uploads.middleware.js';
import PostController from './post.controller.js';
const postController = new PostController();
const postRouter = express.Router();



postRouter.get('/all',(req, res)=>{
    postController.getAllPostsCont(req, res);
})

postRouter.get('/:postId',(req, res)=>{
    // console.log("get by post id enter in this root");
    postController.getPostByPostIdCont(req, res);
})

postRouter.get('/',(req, res)=>{
    // console.log("get by post user enter in this root");
    postController.getPostByUserIdCont(req, res);
})


postRouter.post('/', upload.single('imageUrl'), (req, res)=>{
   postController.createNewPost(req, res);
})
postRouter.delete('/:postId',(req, res)=>{
    postController.deletePostByPostIdCont(req, res);
})
postRouter.put('/:postId',upload.single('imageUrl') ,(req, res)=>{
    postController.updatePostByPostIdCont(req, res);
})




export default postRouter;