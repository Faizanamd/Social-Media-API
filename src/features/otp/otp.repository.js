import { v4 as uuidv4 } from 'uuid';
import OtpModel from "./otp.schema.js";
export default class OtpRepository {
    async generateAndSaveOTP(userId) {
        const otp = uuidv4().substr(0, 6); // Generate a 6-digit OTP
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15); // Set OTP expiration to 15 minutes

        const otpData = new OtpModel({
            userId,
            otp,
            expiresAt,
        });

        await otpData.save();
        return otpData;
    }
    async verifyOTP(userId, otp) {
        console.log('Verifying OTP for userId:', userId);
        console.log('Received OTP:', otp);

        const otpData = await OtpModel.findOne({ userId, otp, expiresAt: { $gt: new Date() } });

        console.log('Found OTP Data:', otpData);

        return otpData !== null;
    }
    async resetPassword(userId, newPassword) {
        try {
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }
            user.password = newPassword;
            await user.save();


            await OtpModel.deleteMany({ userId });

            console.log(`Password reset for user with ID: ${userId}`);
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    }
}