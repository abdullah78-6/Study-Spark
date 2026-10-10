import express from "express"
import { Addcourse, Deletecourse, Enroolement_payment, Getcourse, Getcourse_teacher, Payment_verifivation } from "../controller/Course-controller.js";
import { upload } from "../utils/multer.js";
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
import { cacheMiddleware } from "../middleware/cache-middleware.js";
const Courserouter=express.Router();
Courserouter.post("/addcourse",upload.single("image"),Authmiddleware,Addcourse);
Courserouter.delete("/deletecourse",Authmiddleware,Deletecourse);
Courserouter.get("/getcourse",cacheMiddleware(3),Getcourse);
Courserouter.get("/getcourse_teacher",cacheMiddleware(3),Authmiddleware,Getcourse_teacher);
Courserouter.post("/payment",Enroolement_payment);
Courserouter.get("/chk_payment",Payment_verifivation);
export default Courserouter;

