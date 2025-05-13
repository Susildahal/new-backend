
import mongoose from "mongoose";

const principalSchema = new mongoose.Schema({
  principalName: {
    type: String,
    required: true,
    trim: true,
    set: (value) => value.toUpperCase()
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String, // store the path or filename of the uploaded image
    required: true,
  },

}, {
  timestamps: true
});

const Princaple = mongoose.model("Princaple", principalSchema);
export default Princaple;

