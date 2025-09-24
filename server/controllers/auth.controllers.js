//register
// -> check if it is empty or not 
// -> check existing user
// -> bcrypt password and save it in the db
//login 
// -> check if it is empty or not 
// -> check if it is not an existing user if not provide error
//-> check password
//reset-password
//reset-otp
// verify-otp
// logout 
// verify-email


import userModel from "../models/user.models";
import jwt from "jsonwebtoken";
import "dotenv/config";


export const register = async (req, res)=>{
    const {name, email, password}= req.body;

    if(!name || !email || !password){
        console.log("Details are missing !!");
        return res.json({success:false, msg:"Missing Details"})
    }
    try {
        const existingUser = userModel.findOne({email});
        if(existingUser){
            console.log('the user already exists');
            return res.json({success:false, msg:"User already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({name, email, password:hashPassword})
        await user.save();
      
        //generating jwt tokens 
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: "7d"});

        res.cookie("token",token ,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none":"strict",
            maxAge: 7*24*60*60*1000,
        })



        return res.json({success:true, msg:"Successfully registered"})
        
    } catch (error) {
        return res.status(400)
         .json({success:false, msg:error.message})        
    }


}

export const login = async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        console.log("Details are missing!!")
        return res.json({success:false, msg:"details are missing!!"})
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            console.log("User doesnot exists");
            return res.json({success:false, msg:"user doesnot exists"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            console.log("Password didnot match")
            return res.json({success:false, msg:"password didnot match"});
        }


        //generating jwt tokens 
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: "7d"});

        res.cookie("token",token ,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none":"strict",
            maxAge: 7*24*60*60*1000,
        })


        return res.status(200).json({success:true, msg:"Successfully logged in"})


        
    } catch (error) {
        return res.status(400).json({success:false, msg:error.message})
        
    }
    
}