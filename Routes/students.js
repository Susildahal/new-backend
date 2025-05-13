import express from "express";
import { addStudent, getAllStudents, Updatestudents, deleteStudent,getAllStudentsbyid } from "../Contlollers/studentController.js";
import  verifyToken  from "../Middlewars/adminid.js"

const students = express.Router();
students.post("/add",verifyToken, addStudent);
students.post("/all", getAllStudents);
students.delete("/delete/:id",verifyToken, deleteStudent);
students.get ("/getAllStudentsbyid/:id",verifyToken, getAllStudentsbyid)
students.put("/Updatestudents/:id",verifyToken, Updatestudents);

export default students;
