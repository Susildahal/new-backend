import mongoose from "mongoose";
const userSchima = new mongoose.Schema({
    email: { require: true, type: String, unique: true, lowercase: true },
    navigatorame: { require: true, type: String },
    passport: { require: true, type: String }

});

export const Newuser = mongoose.model("User", userSchima);