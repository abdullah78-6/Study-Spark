import { Teachermodel } from "../models/Teacher-auth-model.js";
import Cloudinary from "../utils/cloudinary.js";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_API_KEY,
api_secret:process.env.CLOUD_API_SECRET  
});
const Addnotes=async(req,res)=>{
    try {
    const {authorname,subject,status,price}=req.body;
    const teacher=await Teachermodel.findById(req.user.id);
    if(!teacher){
        return res.json({status:false,message:"Teacher is Not authorized login again"});
    }
    if(!req.file){
        return res.json({status:false,message:"Please Select Notes"});
    }
    const result=await cloudinary.uploader.upload(req.file.path,{
        folder:"uploads",
        resourse_type:"auto",
    })
    let pdfurl=result.secure_url;
    console.log("notes pdf url is ",pdfurl);
    fs.unlinkSync(req.file.path);
    const data={
        authorname:authorname,
        subject:subject,
        status:status,
        price:price,
        filename:pdfurl,
        public_id:result.public_id,
        resource_type:result.resource_type,
        localfile:req.file.name

    }
teacher.Notes_upload.push(data);
await teacher.save();
return res.json({status:true,message:"Notes Upload Sucessfully"});
    } catch (error) {
        console.log("Add notes error",error);
        
    }

}
const Getnotes=async(req,res)=>{
     try {
            const Teacher=await Teachermodel.findById(req.user.id);
            if(!Teacher){
                return res.json({status:false,message:"Teacher Not Found Login Again"})
            }
            const result=Teacher.Notes_upload;
            return res.json({status:true,result:result});
            
        } catch (error) {
            console.log("Get Notes error admin ",error);
            
        }

}
const Deletenotes=async(req,res)=>{
    const {_id}=req.body;
    try {
        if(!req.user||!req.user.id){
            return res.json({status:false,message:"Teacher not Authenticated"})
        }
        if(!_id){
            return res.json({status:false,message:"Database id is required"})
        }
        const teacher=await Teachermodel.findById(req.user.id);
        if(!teacher){
        return res.json({status:false,message:"Teacher not found"});
        }
        const notes=teacher.Notes_upload.id(_id);
        if(notes.public_id){
        await cloudinary.uploader.destroy(notes.public_id,{
        resource_type:notes.resource_type,
        invalidate:true
        });
        }
        if(!notes){
        return res.json({status:false,message:"Notes not found"});
      }
      teacher.Notes_upload.pull(_id);
      await teacher.save();
      return res.json({status:true,message:"Notes Remove Sucessfully"});
        
        
    } catch (error) {
        console.log("Notes quiz error ",error);
        
    }

}
const Getnotesclient=async(req,res)=>{
    try {
        const teacher =await Teachermodel.find();
       const notes=teacher.flatMap(
        teacher=>teacher.Notes_upload
       );
       return res.json({status:true,result:notes});
    } catch (error) {
        console.log("get notes client error",error);
    }

}
export {Addnotes,Getnotes,Deletenotes,Getnotesclient}