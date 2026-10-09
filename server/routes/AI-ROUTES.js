import express from "express"
import { Sendmessage } from "../controller/AI-CONTROLLER.js";
const Airouter=express.Router();
Airouter.post("/send",Sendmessage)
export default Airouter;