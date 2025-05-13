import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Achivement = mongoose.model("Achivement", achievementSchema);

export default Achivement;
