import Teacher from "../Models/Teacher.js"

export const saveteacher= async (req,resp)=>{
   try {
      const { firstName,lastName,email,phone,qualification,subject,experience,address,bio} =req.body
 if(!req.body){
    return  resp.status(404).json({msg:"All field is required "})
 }
 const photo = req.file?.filename;
 if(!photo){
   return  resp.status(404).json({msg:"Photo is required is required "})
 }
 const newteacher=new Teacher({firstName,lastName,email,phone,qualification,subject,experience,address,bio})
  await newteacher.save()
  resp.status(200) .json({success:true,msg:"Teacher added successfully"})
   } catch (error) {
      resp.status(500),json({success:false,msg:"internal server error "})
   }
}
