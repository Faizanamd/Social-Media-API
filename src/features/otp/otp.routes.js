import express from 'express';
const app =express();
const otpRouter= express.Router();

import OtpController from './otp.controller.js';
const  otpController = new OtpController();

otpRouter.post('/send', (req, res)=>{
    otpController.sendOTP(req, res);
});
app.use(express.json());
otpRouter.post('/verify', (req, res)=>{
    console.log('Incoming Request:', req.method, req.url);
    otpController.verifyOTP(req, res);
    // try {
    //     console.log('Incoming Request:', req.method, req.url);
    //     otpController.verifyOTP(req, res);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
});
otpRouter.post('/reset-password', (req, res)=>{
    otpController.resetPassword(req, res);
});









export default otpRouter;