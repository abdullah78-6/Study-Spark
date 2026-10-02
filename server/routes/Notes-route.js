import express from "express"
import { Addnotes, Deletenotes, Getnotes } from "../controller/Notes-controller.js";
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
import { upload } from "../utils/multer.js";
const Notesrouter=express.Router();
Notesrouter.post("/add_notes",Authmiddleware,upload.single("notes_file"),Addnotes);
Notesrouter.get("/get_notes",Authmiddleware,Getnotes);
Notesrouter.delete("/del_notes",Authmiddleware,Deletenotes);
export default Notesrouter;