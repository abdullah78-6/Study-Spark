import express from "express"
import { Getprofile, GoogleLogin, Logout, Signin, Signup } from "../controller/Teacher-auth.js";
const Teacherrouter=express.Router();
Teacherrouter.post("/create",Signup);
Teacherrouter.post("/Login",Signin);
Teacherrouter.post("/Logout",Logout);
Teacherrouter.get("/getteacher",Getprofile);
Teacherrouter.post("/Teach_GoogleLogin",GoogleLogin);
export default Teacherrouter;