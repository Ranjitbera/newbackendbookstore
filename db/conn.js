const mongoose=require("mongoose")
const dotenv = require('dotenv');
dotenv.config();
const connect = ()=>{
    mongoose.connect(process.env.DATABASE
        ).then(()=>{
            console.log("connected to database succesfully")
        })
        .catch((err)=>{
           console.log(err.message)
        })
    }

connect();

