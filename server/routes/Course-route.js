import express from "express"
import { Addcourse, Deletecourse, Getcourse } from "../controller/Course-controller.js";
import { upload } from "../utils/multer.js";
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
const Courserouter=express.Router();
Courserouter.post("/addcourse",upload.single("image"),Authmiddleware,Addcourse);
Courserouter.delete("/deletecourse",Deletecourse);
Courserouter.get("/getcourse",Getcourse);
export default Courserouter;

