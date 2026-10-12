import express from "express"
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
import { cacheMiddleware } from "../middleware/cache-middleware.js";
import { Dashboard } from "../controller/Dashboard-controller.js";
const Dasboardrouter=express.Router();
Dasboardrouter.get("/get_dash",Authmiddleware,cacheMiddleware(3),Dashboard);
export default Dasboardrouter;