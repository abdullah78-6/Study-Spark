import express from "express"
import { Getprofile, GoogleLogin, Logout, Signin, Signup } from "../controller/user-auth-controller.js";
const Userauthrouter=express.Router();
Userauthrouter.post("/signup",Signup);
Userauthrouter.post("/signin",Signin);
Userauthrouter.post("/logout",Logout);
Userauthrouter.get("/getprofile",Getprofile);
Userauthrouter.post("/googlelogin",GoogleLogin);
export default Userauthrouter;
