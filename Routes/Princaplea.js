import express from 'express';
import upload from '../Middlewars/Upload.js' // multer config
import { addPrincipal,updatePrincipal,getPrincipal } from '../Contlollers/Princaple.js';
import  isSuperAdmin from "../Middlewars/isSuperAdmin.js"
import verifyToken from "../Middlewars/adminid.js"
 

const Princaple = express.Router();

Princaple.post('/add-principal',verifyToken,isSuperAdmin,upload.single('photo'), addPrincipal);
Princaple.put('/add-updatePrincipal',verifyToken,isSuperAdmin, upload.single('photo'), updatePrincipal);
Princaple.get('/get-principal', getPrincipal);

export default Princaple;
