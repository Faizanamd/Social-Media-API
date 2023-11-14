import { ApplicationError } from "../../error-handler/applicationError.js";
import PostRepository from "./post.reqository.js";
const postRepository = new PostRepository();



export default class PostController {
    async createNewPost(req, res) {
        const { caption } = req.body;
        const userID = req.userID;
        console.log(req.body);
        const imageUrl = req.file.filename;
        const newPost = { userID, caption, imageUrl };
        try {
            const result = await postRepository.createPostRepo(newPost);
            res.status(201).send(result);
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }

    // method to get all posts
    async getAllPostsCont(req, res) {
        try {
            const posts = await postRepository.getAllPostsRepo();
            res.status(200).send(posts);
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }

    // method to get post by post id
    async getPostByPostIdCont(req, res) {
        const postId = req.params.postId;
        const userId = req.userID;
        // console.log("userid", userId);
        // console.log("ppstid", postId);
        console.log("get by post id enter in this controller");
        try {
            const post = await postRepository.getPostByPostIdRepo(userId, postId);
            if (!post) {
                res.status(404).send(post);
            }
            res.status(200).send(post);
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }


    // get posts by userid
    async getPostByUserIdCont(req, res) {
        const userId = req.userID;
        console.log("userid", userId);
        console.log(userId);
        console.log("get by post user enter in this controller");
        try {
            const posts = await postRepository.getPostByUserIdRepo(userId);
            if(!posts){
                res.status(404).send(posts);
            }
            res.status(200).send(posts);
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }

    // deleting a post by post id
    async deletePostByPostIdCont(req, res) {
        const postId = req.params.postId;
        const userId = req.userID;
        try {
            const result = await postRepository.deletePostByPostIdRepo(postId, userId);
    
            if (!result) {
                res.status(404).send("Post not found");
            } else {
                res.status(201).send("Post Deleted successfully");
            }
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }
    

    //upadting post by postId
    async updatePostByPostIdCont(req, res) {
        const postId = req.params.postId;
        const { caption } = req.body;
        const imageUrl = req.file.filename;
        const updateData = {  caption, imageUrl };
        // console.log(updateData);
        

        try {
            const updatedPost = await postRepository.updatePostByPostIdRepo(postId, updateData);
            res.status(200).send(updatedPost);
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