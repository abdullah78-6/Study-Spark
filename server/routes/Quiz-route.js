import express from "express"
import { Addquiz, Deletequiz, Getquizadmin, Getstudentquiz } from "../controller/Quiz-controller.js";
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
import { cacheMiddleware } from "../middleware/cache-middleware.js";
const Quizrouter=express.Router();
Quizrouter.post("/addquiz",Authmiddleware,Addquiz);
Quizrouter.delete("/deletequiz",Authmiddleware,Deletequiz);
Quizrouter.get("/getquizadmin",cacheMiddleware(3),Authmiddleware,Getquizadmin);
Quizrouter.get("/getstudentquiz",cacheMiddleware(3),Getstudentquiz);
export default Quizrouter