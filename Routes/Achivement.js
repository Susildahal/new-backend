import express from "express";
import { deleteAchivement, getAchivement, saveAchivement } from "../Contlollers/Achivement.js";
import upload from "../Middlewars/Upload.js";
import Both from "../Middlewars/Both.js"
import verifyToken from "../Middlewars/adminid.js"

const Achivement = express.Router();

// Routes
Achivement.get("/getAchivement", getAchivement);
Achivement.post("/saveAchivement", verifyToken, Both, upload.single('photo'), saveAchivement);
Achivement.delete("/deleteAchivement/:id", verifyToken,Both, deleteAchivement);

export default Achivement;
