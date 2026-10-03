import express from "express"
import { Addpyq, Deletepyq, Getpyqteacher } from "../controller/Pyq-controller.js";
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
import { upload } from "../utils/multer.js";
const Pyqrouter=express.Router();
Pyqrouter.post("/add_pyq",Authmiddleware,upload.single("pyq_file"),Addpyq);
Pyqrouter.get("/get_pyq",Authmiddleware,Getpyqteacher);
Pyqrouter.delete("/del_pyq",Authmiddleware,Deletepyq);
export default Pyqrouter;