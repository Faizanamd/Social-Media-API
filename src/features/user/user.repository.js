
import UserModel from "./user.Schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository {
    async logoutRepository(userId, sessionToken) {
        try {
            const user = await UserModel.findById(userId);


            if (user) {
                const updatedUser = await UserModel.findByIdAndUpdate(userId, { $pull: { sessions: sessionToken } });


                if (updatedUser) {
                    return updatedUser;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }

    }
    async singUpRep(user) {
        try {
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (err) {
            if (err instanceof ApplicationError) {
                throw err;
            } else if (err instanceof UserModel.ValidationError) {
                throw new ApplicationError(err.message, 400);
            } else {
                console.log(err);
                throw new ApplicationError("Something went wrong with the database", 500);
            }
        }
    }

    async findByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async logout(userId, sessionToken) {
        try {
            await UserModel.findByIdAndUpdate(userId, { $pull: { sessions: sessionToken } });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }
    async getUserById(userId) {
        try {
            return await UserModel.findById(userId);
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }
    async logoutAllDevices(userId) {
        try {
            await UserModel.findByIdAndUpdate(userId, { $set: { sessions: [] } });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async getSpecificDetail(userId) {
        try {
            return await UserModel.findById(userId, { password: 0, sessions: 0 });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async getAllUserDetails() {
        try {
            return await UserModel.find({}, { password: 0, sessions: 0 });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async updateUser(userId, updatedData) {
        try {
            console.log("Updated data:", updatedData);

            // Find the user by userId
            const updatedUser = await UserModel.findOne({ _id: userId });

            // Check if the user exists
            if (!updatedUser) {
                throw new ApplicationError('User not found', 404);
            }

            // Update properties based on provided data
            if (updatedData.name) {
                updatedUser.name = updatedData.name;
            }

            if (updatedData.gender) {
                updatedUser.gender = updatedData.gender;
            }

            // Save the updated user
            const savedUser = await updatedUser.save();
            console.log("Updated user:", savedUser);

            return savedUser;
        } catch (err) {
            if (err instanceof UserModel.ValidationError) {
                throw new ApplicationError(err.message, 400);
            } else {
                console.log(err);
                throw new ApplicationError("Something went wrong with the database", 500);
            }
        }
    }
}

export default UserRepository;
