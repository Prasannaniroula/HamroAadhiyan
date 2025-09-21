//register
//login 
//reset-password
//reset-otp
// verify-otp
// logout 
// verify-email


export const register = async (req, res)=>{
    const {name, email, password}= req.body;

    if(!name || !email || !password){
        console.log("Details are missing !!");
        return res.json({success:false, msg:"Missing Details"})
    }
    try {
        
    } catch (error) {
        return res.status(400)
         .json({success:false, msg:error.message})        
    }


}