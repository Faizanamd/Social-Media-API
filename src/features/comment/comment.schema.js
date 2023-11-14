

import mongoose from "mongoose";

const commentSchema  = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }, 
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }, 
    content:String
});

const CommentModel = mongoose.model('comments', commentSchema);
export default CommentModel;