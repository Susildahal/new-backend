import mongoose from "mongoose";
const  userschima=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName: {type:String,required:true},
    email:{type:String,required:true,lowercase:true},
    phone: {type:Number,required:true},
    message: {type:String,required:true},
})
const Notic = mongoose.models.Notic || mongoose.model("Notic", userschima);

export default Notic;