 import mongoose, { Types } from "mongoose";

 const teacherschima= new mongoose.Schema({
    firstName: {required:true, Types:String},
    lastName:{required:true, Types:String} ,
    email: {required:true, Types:String},
    phone: {required:true, Types:Number},
    qualification: {required:true, Types:String},
    subject: {required:true, Types:String},
    experience: {required:true, Types:String},
    address: {required:true, Types:String},
    bio: {required:true, Types:String},
    image:{required:true, Types:String}
 })

 const Teacher=mongoose.model("Teacher",teacherschima)
 export default Teacher