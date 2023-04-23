const jwt=require("jsonwebtoken");
const User=require("../model/users.js");


const auth=async (req,res,next)=>{


    try{
        const token=req.body.newToken;

        const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
        if(!verifyUser){
            res.sendStatus(402);
        }
    
        const user=await User.findOne({_id:verifyUser._id});
        req.token=token;
        req.user=user;
        next();
    }catch(error){
       res.status(401).send(error)
    }
    
}
module.exports=auth;