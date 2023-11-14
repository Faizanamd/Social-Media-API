import OtpRepository from "./otp.repository.js";
const otpRepository = new OtpRepository();


export default class OtpController{
    async sendOTP(req, res){
        try {
            // Implement logic to send OTP via email
            const userId = req.userID;
            const { email } = req.body;
            const otpData = await otpRepository.generateAndSaveOTP(userId);
            console.log((otpData));
        
            res.json({ success: true, message: 'OTP sent successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }
    async verifyOTP(req, res){
        try {
            const userId  = req.userID;
            console.log(req.query);
            const {otp} = req.query;
            console.log(otp);
            const isVerified = await otpRepository.verifyOTP(userId, otp);
            console.log(isVerified);
            if (isVerified) {
                console.log(isVerified);
              res.json({ success: true, message: 'OTP verified successfully' });
            } else {
              res.status(401).json({ success: false, message: 'Invalid OTP' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }
    async resetPassword(req,res){
        try {
            // Implement logic to reset the user's password
            const { userId, newPassword } = req.body;
            await otpRepository.resetPassword(userId, newPassword);
        
            res.json({ success: true, message: 'Password reset successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }
}