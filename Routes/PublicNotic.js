import express from "express";
import { deletePublicNotic, savePublicNotic, getPublicNotic } from "../Contlollers/PublicNotic.js";
import upload from "../Middlewars/Upload.js";
import Both from "../Middlewars/Both.js"
import verifyToken from "../Middlewars/adminid.js"


const PublicNotic = express.Router();

// Routes
PublicNotic.get("/getPublicNotic", getPublicNotic);
PublicNotic.post("/savePublicNotic", verifyToken,Both,  upload.single('photo'), savePublicNotic);
PublicNotic.delete("/deletePublicNotic/:id", verifyToken,Both, deletePublicNotic);

export default PublicNotic;
