import userModel from "../models/users.models.js";
import { socialUser } from "../models/SocialUser.models.js";

export const getUserData = async (req,res)=>{

    try {
        const userId = req.user.id;
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


export const updateUser = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

    const { name } = req.body;
    let photoPath;

    if (req.file) {
      // multer saves file info in req.file
      photoPath = req.file.path; // or save to cloud storage
    }

    let updatedUser;
    if (req.user?.isSocialUser) {
      updatedUser = await socialUser.findByIdAndUpdate(
        userId,
        { name, ...(photoPath && { avatar: photoPath }) },
        { new: true }
      );
    } else {
      updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { name, ...(photoPath && { photo: photoPath }) },
        { new: true }
      ).select("-password");
    }

    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("❌ Update user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
