import { ObjectId } from "mongodb";
import PostModel from "./post.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
export default class PostRepository {

    async createPostRepo(post) {
        console.log(post);

        try {
            const newPost = new PostModel(post);
            await newPost.save();
            return newPost;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async getAllPostsRepo() {
        try {
            const posts = await PostModel.find({}, '_id caption imageUrl');

            return posts;
        } catch (err) {
            console.error(err);
            throw new ApplicationError("Error while fetching posts from the database", 500);
        }
    }

    async getPostByPostIdRepo(userId, postId) {
        console.log("get by post id enter in this repository");
        try {
            console.log("userid", userId);
            console.log("ppstid", postId);
            const post = await PostModel.findOne({ _id: new ObjectId(postId), userID: new ObjectId(userId) });
            if (!post) {
                throw new ApplicationError("Post not found", 404);
            }
            return post;
        } catch (err) {
            console.error(err);
            throw new ApplicationError("Error while fetching post from the database", 500);
        }
    }


    async getPostByUserIdRepo(userId) {
        console.log("get by post user enter in this repository");
        try {
            const posts = await PostModel.find({ userID: new ObjectId(userId) });
            return posts;
        } catch (err) {
            console.error(err);
            throw new ApplicationError("Error while fetching posts from the database", 500);
        }
    }

    async deletePostByPostIdRepo(userId, postId) {
        try {
            const result = await PostModel.findOneAndDelete({ _id: new ObjectId(userId), userID: new ObjectId(postId) });

            // if (!result) {
            //     return false; // No document found
            // }

            // return true; // Document found and deleted successfully

            return result;
        } catch (err) {
            console.error(err);
            throw new ApplicationError("Error while deleting post from the database", 500);
        }
    }
    async updatePostByPostIdRepo(postId, updatedData) {
        // console.log(updatedData)
        // console.log(updatedData);
        const updatePost = await PostModel.findOne({ _id: postId }).exec();
        console.log("updatepost", updatePost);
        if (!updatePost) {
            // Handle the case where the post with the given ID is not found.
            return null; // or throw an error, depending on your logic.
        }

        if (updatedData.caption) {
            updatePost.caption = updatedData.caption;
        }

        if (updatedData.imageUrl) {
            updatePost.imageUrl = updatedData.imageUrl;
        }
        const saveduser = await updatePost.save();
        // console.log(saveduser);
        return saveduser;
    }

}