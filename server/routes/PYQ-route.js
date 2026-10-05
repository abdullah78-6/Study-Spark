import express from "express"
import { Addpyq, Deletepyq, Getpyqclient, Getpyqteacher, Searchapi } from "../controller/Pyq-controller.js";
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
import { upload } from "../utils/multer.js";
import { cacheMiddleware } from "../middleware/cache-middleware.js";
const Pyqrouter=express.Router();
Pyqrouter.post("/add_pyq",Authmiddleware,upload.single("pyq_file"),Addpyq);
Pyqrouter.get("/get_pyq",cacheMiddleware(3),Authmiddleware,Getpyqteacher);
Pyqrouter.delete("/del_pyq",Authmiddleware,Deletepyq);
Pyqrouter.get("/get_pyq_client",cacheMiddleware(3),Getpyqclient);
Pyqrouter.get("/search",cacheMiddleware(3),Searchapi);
export default Pyqrouter;