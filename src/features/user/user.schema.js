// models/user.schema.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, maxLength: [25, "Name can't be greater than 25 characters"] },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password: String,
    gender: { type: String, enum: ['Male', 'Female'] },
    sessions: [{ type: String }]  
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
