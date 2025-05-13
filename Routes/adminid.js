import express from "express";
const adminrouter=express.Router();
import {createuser,deleteuser,passwordUpdate, getuser,passwordcheckotp,passwordchangeotp,logout,checkotptologin,Login ,getalluser,updateuser, getUserController, Checkloginststus} from "../Contlollers/adminid.js"
import  verifyToken  from "../Middlewars/adminid.js"
import  isSuperAdmin from "../Middlewars/isSuperAdmin.js"
 import {loginlimiter} from "../config/Limit.js"


 adminrouter.post("/createuser",verifyToken, isSuperAdmin,createuser)
// adminrouter.post("/createuser",createuser)
adminrouter.delete("/deleteuser/:id",deleteuser)
adminrouter.post("/Login",loginlimiter, Login)
adminrouter.put("/passwordUpdate",passwordUpdate)
adminrouter.post("/passwordchangeotp",loginlimiter,passwordchangeotp)   
adminrouter.post("/passwordcheckotp",loginlimiter,passwordcheckotp)
adminrouter.post("/checkotptologin", loginlimiter,checkotptologin)
adminrouter.post("/logout",verifyToken, logout)
adminrouter.get("/getuser",verifyToken, getuser)
adminrouter.get("/getalluser", getalluser)
adminrouter.put("/updateuser/:id" ,updateuser )
adminrouter.get("/getUserController/:id" ,getUserController )
adminrouter.post("/Checkloginststus",verifyToken ,Checkloginststus )


export default adminrouter; 

