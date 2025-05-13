import Achivement from "../Models/Achivement.js"

export const saveAchivement = async (req, res) => {
    const { message } = req.body;
    const photo = req.file?.filename;
   
    // Validation
    if (!message || !photo) {
      return res.status(400).json({ success: false, msg: "All fields are required." });
    }
  
    try {
      const newAchivement = new Achivement({ message, photo });
      await newAchivement.save();
  
      return res.status(201).json({
        success: true,
        msg: "Achievement added successfully",
        data: newAchivement, // Optional: return saved data
      });
    } catch (error) {
      console.error("Save achievement error:", error);
      return res.status(500).json({
        success: false,
        msg: "Internal server error",
      });
    }
  };
  
 

  export const getAchivement=async(req,resp)=>{
 const user=await Achivement.find()
 if(!user|| user.length==0){
    return resp.status(404).json({success:false, msg:"Achivement not found"})
 }
 try {
    resp.status(200).json({success:true,msg:"Achivement found", data:user})
 } catch (error) {
    resp.status(500).json({success:false, msg:"Internal server error"})
 }
  }
  export const deleteAchivement = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ success: false, msg: "Achievement ID is required" });
    }
  
    try {
      const deleted = await Achivement.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ success: false, msg: "Achievement not found" });
      }
  
      return res.status(200).json({ success: true, msg: "Achievement deleted successfully" });
    } catch (error) {
      console.error("Delete Achievement Error:", error);
      return res.status(500).json({ success: false, msg: "Internal server error" });
    }
  };
  


