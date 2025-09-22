//register
// -> check if it is empty or not 
// -> check existing user
// -> bcrypt password and save it in the db
//login 
//reset-password
//reset-otp
// verify-otp
// logout 
// verify-email


import userModel from "../models/user.models";


export const register = async (req, res)=>{
    const {name, email, password}= req.body;

    if(!name || !email || !password){
        console.log("Details are missing !!");
        return res.json({success:false, msg:"Missing Details"})
    }
    try {
        const existingUser = userModel.findOne({email});
        if(!existingUser){
            console.log('the user already exists');
            return res.json({success:false, msg:"User already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({name, email, password:hashPassword})
        await user.save();
        return res.json({success:true, msg:"Successfully registered"})
        
    } catch (error) {
        return res.status(400)
         .json({success:false, msg:error.message})        
    }


}

export const login = async(req,res)=>{
    
}