// routes/user.routes.js
import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const userController = new UserController();
const userRouter = express.Router();

// Authentication Routes
userRouter.post('/signup', (req, res) => {
    userController.signupController(req, res);
});

userRouter.post('/signin', (req, res) => {
    userController.signinController(req, res);
});

userRouter.get('/logout', jwtAuth, (req, res) => {
    userController.logoutController(req, res);
});

userRouter.get('/logout-all-devices', jwtAuth, (req, res) => {
    userController.logoutAllDevicesController(req, res);
});

// User Profile Routes
userRouter.get('/get-details/:userId', jwtAuth, (req, res) => {
    userController.getSpecificDetailController(req, res);
});

userRouter.get('/get-all-details', jwtAuth, (req, res) => {
    userController.getAllUserDetailsController(req, res);
});

userRouter.put('/update-details/:userId', jwtAuth, (req, res) => {
    userController.updateUserController(req, res);
});

export default userRouter;
