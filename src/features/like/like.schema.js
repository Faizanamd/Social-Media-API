import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    postOrCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const LikeModel =  mongoose.model('likes', likeSchema);
export default LikeModel;