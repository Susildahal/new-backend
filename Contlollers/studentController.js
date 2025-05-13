import Student from "../Models/Student.js";

// Add
export const addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ msg: "Student added successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to add student" });
  }
};





export const getAllStudents = async (req, res) => {
    try {
      const { className } = req.body;
  
      const query = className ? { className: parseInt(className) } : {};
  
      const students = await Student.find(query);
      res.status(200).json({ success: true, data: students });
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  




// Update
export const updateStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Student updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update student" });
  }
};

// Delete
export const deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      
     
  
      const deletedStudent = await Student.findByIdAndDelete(id);
      
      if (!deletedStudent) {
        return res.status(404).json({ success: false, msg: "Student not found" });
      }
  
      res.status(200).json({ 
        success: true,
        msg: "Student deleted successfully",
        data: deletedStudent 
      });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ 
        success: false,
        msg: "Failed to delete student",
        error: err.message 
      });
    }
  };

 export const Updatestudents = async (req, resp) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    className,
    status,
    address,
    guardianName,
    gender
  } = req.body;

  if (!firstName || !lastName || !className || !status || !address || !guardianName || !gender) {
    return resp.status(400).json({
      success: false,
      msg: "Please provide all student data"
    });
  }

  try {
    if (!id) {
      return resp.status(400).json({
        success: false,
        msg: "Please provide the student ID"
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        className,
        status,
        address,
        guardianName,
        gender
      },

      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedStudent) {
      return resp.status(404).json({
        success: false,
        msg: "Student not found"
      });
    }

    resp.status(200).json({
      success: true,
      msg: "Student updated successfully",
      data: updatedStudent
    });

  } catch (err) {
    resp.status(500).json({
      success: false,
      msg: "Failed to update student",
      error: err.message
    });
  }
};

export const getAllStudentsbyid=async (req,resp)=>{
  const {id}=req.params;
  if(!id){
    return resp.status(404).json({success :false , msg:"please provide the studeny id " })
  }
    try {
      const student=await Student.findById(id);
      if(!student){
    return resp.status(404).json({success :false , msg:"Students Not found " })
      }
      resp.status(200).json({success :true ,data:student})
    } catch (error) {
      resp.status(500).json({
      success: false,
      msg: "Failed to update student",
      error: err.message
    });
    }
}
