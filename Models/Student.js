import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  className: Number,
  status: { type: String, default: "Active" },
  address: String,
  guardianName: String,
  gender: String,
});

export default mongoose.model("Student", studentSchema);
