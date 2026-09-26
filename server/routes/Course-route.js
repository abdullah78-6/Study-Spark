import express from "express"
import { Addcourse, Deletecourse, Getcourse, Getcourse_teacher } from "../controller/Course-controller.js";
import { upload } from "../utils/multer.js";
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
const Courserouter=express.Router();
Courserouter.post("/addcourse",upload.single("image"),Authmiddleware,Addcourse);
Courserouter.delete("/deletecourse",Authmiddleware,Deletecourse);
Courserouter.get("/getcourse",Getcourse);
Courserouter.get("/getcourse_teacher",Authmiddleware,Getcourse_teacher);
export default Courserouter;

