// models/adminid.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
    },

    roll: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        default: 0
    },
    otpExpiry: {
        type: Date,
        default: 0
    },
    passwordChangeOtp: {
        type: String,
        default: "0"
    },
    passwordChangeOtpExpiredAt:{
        type: Date,
        default: 0
    },
   
});

const adminid = mongoose.model("account", userSchema);
export default adminid;
