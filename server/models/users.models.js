import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    verifyOtp:{
        type:String, 
        default:'',
    },
    verifyOtpExpireAt:{
        type:Number, 
        default:0,
    },
    isAccountVerified:{
         type:Boolean, 
         default:false,
        },
    resetOtp:{
        type:String, 
        default:false
    },
    resetOtpExpireAt:{
        type:Number, 
        default:0
    },
}, {
    timestamps: true
});
const User = mongoose.model("User", userSchema);
export default User;