

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }, 
    caption: String, 
    imageUrl:String,

})

const PostModel = mongoose.model('posts', postSchema);

export default PostModel;