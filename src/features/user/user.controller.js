// controllers/user.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const userRepository = new UserRepository();

class UserController {
    async signupController(req, res) {
        try {
            const result = await userRepository.singUpRep(req.body);
            res.status(201).send(result);
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).json({ error: err.message });
            } else {
                console.log(err);
                res.status(500).json({ error: "Something went wrong" });
            }
        }
    }

    async signinController(req, res) {
        try {
            const user = await userRepository.findByEmail(req.body.email);
            if (!user) {
                return res.status(400).json({ error: 'Incorrect Credentials' });
            } else {
                const result = bcrypt.compare(req.body.password, user.password);
                if (result) {
                    const token = jwt.sign(
                        {
                            userID: user._id,
                            email: user.email,
                        },
                        'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                        {
                            expiresIn: '1h',
                        }
                    );

                    // Add the generated token to the user's sessions array
                    user.sessions.push(token);
                    await user.save();

                    return res.status(200).json({ token });
                } else {
                    return res.status(400).json({ error: 'Incorrect Credentials' });
                }
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }

    async logoutController(req, res) {
        try {
            const token = req.headers['authorization'];
            const userId = req.userID;
    
            const result = await userRepository.logoutRepository(userId, token);
    
            if (result == null) {
                return res.status(400).json({ error: "User already logged out" });
            }
    
            res.status(200).json({ message: "Logout successful" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Something went wrong" });
        }
    }

    async logoutAllDevicesController(req, res) {
        try {
            const userId = req.userID;

            await userRepository.logoutAllDevices(userId);

            res.status(200).json({ message: "Logout from all devices successful" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Something went wrong" });
        }
    }

    async getSpecificDetailController(req, res) {
        try {
            const userId = req.params.userId;
            const user = await userRepository.getSpecificDetail(userId);
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Something went wrong" });
        }
    }

    async getAllUserDetailsController(req, res) {
        try {
            const users = await userRepository.getAllUserDetails();
            res.status(200).json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Something went wrong" });
        }
    }

    async updateUserController(req, res) {
        try {
            const userId = req.params.userId;
            const updatedUser = await userRepository.updateUser(userId, req.body);
            if(updatedUser)
            res.status(200).send("user details updated successfully");
            res.status(404).send(updatedUser);
        } catch (err) {
            if (err instanceof ApplicationError) {
                res.status(err.statusCode).json({ error: err.message });
            } else {
                console.log(err);
                res.status(500).json({ error: "Something went wrong" });
            }
        }
    }
}

export default UserController;
