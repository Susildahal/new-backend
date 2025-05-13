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

const PublicNotic = mongoose.model("PublicNotic", achievementSchema);

export default PublicNotic;
