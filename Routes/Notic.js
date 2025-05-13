import {getnoticbyid,getallNotic,deletedNotic,saveNotic} from "../Contlollers/Notic.js"
import express from "express";
const noticrouter=express.Router();
import verifyToken from "../Middlewars/adminid.js"

import {limiter} from "../config/Limit.js"

noticrouter.post("/saveNotic",limiter,saveNotic);
noticrouter.delete("/deletedNotic/:id",verifyToken,deletedNotic);
noticrouter.get("/getallNotic", getallNotic);
noticrouter.get("/getnoticbyid/:id",getnoticbyid)

  export default noticrouter;
  