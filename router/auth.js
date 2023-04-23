const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth.js")
require("../db/conn.js");
const User=require("../model/users.js");
const Bookdata = require("../model/BookData.js")
const router=express.Router();




router.post("/register",async(req,res)=>{
    const {username,password,cpassword}=req.body

     if(!username || !password || !cpassword){
        return res.status(422).json({error:"please filled the data properly"})
     }
     try{
         const userExist=await User.findOne({username:username})
         if(userExist){
            return res.status(422).json({error:"username already Exist"})
        }
        const newuser=new User({username,password,cpassword});

           

        await newuser.save()
        res.status(201).json({message:"user register succesfull"})

          }catch(err){
        res.send(err)

     }
   
})
router.post("/mybook",async(req,res)=>{
    const userid=req.body

    
     try{
        const data = await Bookdata.aggregate([{ $sample: { size: 40 } }]);
         
        res.status(201).json(data)
        console.log(data)

          }catch(err){
        res.send(err)
            console.log(err)
     }
   
})

router.post("/upload",async(req,res)=>{
    const {userid,title,ISBN,author,pdate,pname,desc}=req.body

     try{
        const newuser=new Bookdata({userid,title,ISBN,author,pdate,pname,desc});

           

        await newuser.save()
        res.status(201).json({message:"user register succesfull"})

          }catch(err){
        res.send(err)

     }
   
})


router.post("/signin",async(req,res)=>{
    
  
    try{
        
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({error:"please filled the data"})
        }
        const userLogin= await User.findOne({username:username});


        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password)

               const token= await userLogin.generateAuthToken();

               res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
               });

                  if(isMatch){
                    
                    
                     res.status(200).send({data:token,userId:userLogin._id})
                   }else{
                      res.status(400).send("invalid password")
                   }
            
        }
       
        else{
            res.status(400).send("invalid username")
        }
       
     }catch(err){
        console.log(err)

    }
})


router.post("/logout",auth,async (req,res)=>{

    try{

        res.clearCookie("jwtoken");
        req.user.tokens=[];
        await req.user.save();
        res.status(200).send({msg:"logout succesfully",user:req.user});

        
        

    }catch(error){
        
        res.status(501).send({msg:"err in logout",error:error.message})
    }

})



module.exports=router;