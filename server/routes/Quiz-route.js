import express from "express"
import { Addquiz, Deletequiz, Getquizadmin } from "../controller/Quiz-controller.js";
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
const Quizrouter=express.Router();
Quizrouter.post("/addquiz",Authmiddleware,Addquiz);
Quizrouter.delete("/deletequiz",Authmiddleware,Deletequiz);
Quizrouter.get("/getquizadmin",Authmiddleware,Getquizadmin);
export default Quizrouter