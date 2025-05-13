import jwt from "jsonwebtoken";
import {Newuser} from "../Models/New.js"
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
dotenv.config()


export  const saveUser =async (req,resp)=>{

const {name,email,passport} =req.body;
if(!name || !email || !passport){
    return resp.status(400).json({success:false ,msg:"enter a all field please "})
}
try {
     const userExist= await Newuser.findOne({email});
     if(userExist){
        return resp.status(400).json({success:false ,msg:"Your email is already used  "})  
     }
      const hashedPassword=await bcrypt.hash(passport,10)

     const User= new Newuser({name,email,passport:hashedPassword})
     await User.save()
      const token = jwt.sign({ id:User._id},process.env.  JWT_SECRET,{expireIn:"1h"})
      
 resp.cookies( "token",token ,{
    httponly:true,
    secure:process.env.NODE_ENV==="producation",
    samesite:process.env.NODE_ENV==="producation"?"Strict":"Lax",
    maxAge:60*60*1000,
 })
 resp.status(200).json({success:true ,msg:"user is ragester"})
} catch (error) {

  resp.status(500).json({success:false ,msg:"Internal server error "})   
}
}