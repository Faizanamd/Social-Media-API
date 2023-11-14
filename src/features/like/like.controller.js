import  LikeRepository  from "./like.repository.js";
const likeRepository = new LikeRepository();

import { ApplicationError } from "../../error-handler/applicationError.js";
export default class LikeController {


    async getLikes(req, res) {
        try {
            const postId = req.params.id;
        
            const likes = await likeRepository.getLikesForPost(postId);
            console.log(likes);
            res.send(likes );
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).send(err.message);
            } else {
                console.log(err);
                res.status(500).send("Something went wrong");
            }
        }
    }

    async toggleLike(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.userID; 
            console.log("postid", postId);
            console.log("userid", userId);
            const result = await likeRepository.toggleLike(postId, userId);
            res.json({ result });
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