import userModel from "../models/users.models.js";

export const getUserData = async (req,res)=>{

    try {
        const userId = req.user.id;
        console.log("User ID from token:", userId);
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false, message:"User not found"});
        }
        res.json({
            success:true, 
            userData:{
                _id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                createdAt: user.createdAt,
            }
        })
         
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}