import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { Teachermodel } from "../models/Teacher-auth-model.js";
cloudinary.config({
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_API_KEY,
api_secret:process.env.CLOUD_API_SECRET  
});
const Addpyq=async(req,res)=>{
    try {
       const {authorname,collegename,subject,status,price}=req.body;
           const teacher=await Teachermodel.findById(req.user.id);
           if(!teacher){
               return res.json({status:false,message:"Teacher is Not authorized login again"});
           }
           if(!req.file){
               return res.json({status:false,message:"Please Choose PYQ for upload"});
           }
           const result=await cloudinary.uploader.upload(req.file.path,{
               folder:"uploads",
               resourse_type:"auto",
           })
           let pdfurl=result.secure_url;
           console.log("PYQ pdf url is ",pdfurl);
           fs.unlinkSync(req.file.path);
           const data={
               authorname:authorname,
               college_name:collegename,
               subject:subject,
               status:status,
               price:price,
               filename:pdfurl,
               public_id:result.public_id,
               resource_type:result.resource_type,
               localfile:req.file.name
       
           }
       teacher.PYQ_upload.push(data);
       await teacher.save();
       return res.json({status:true,message:"PYQs Upload Sucessfully"}); 
    } catch (error) {
        console.log("add pyq error",error);
        
    }
}
const Getpyqteacher=async(req,res)=>{
    try {
        const Teacher=await Teachermodel.findById(req.user.id);
            if(!Teacher){
                return res.json({status:false,message:"Teacher Not Found Login Again"})
            }
            const result=Teacher.PYQ_upload;
            return res.json({status:true,result:result});
    } catch (error) {
        console.log("get pyq teacher error",error);
    }

}
const Deletepyq=async(req,res)=>{
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
        const notes=teacher.PYQ_upload.id(_id);
        if(notes.public_id){
        await cloudinary.uploader.destroy(notes.public_id,{
        resource_type:notes.resource_type,
        invalidate:true
        });
        }
        if(!notes){
        return res.json({status:false,message:"PYQ not found"});
      }
      teacher.PYQ_upload.pull(_id);
      await teacher.save();
      return res.json({status:true,message:"PYQ Remove Sucessfully"});
    } catch (error) {
        console.log("delete pyq error",error);
    }
}
const Getpyqclient=async(req,res)=>{
    try {
        const teacher =await Teachermodel.find();
       const pyqs=teacher.flatMap(
        teacher=>teacher.PYQ_upload
       );
       return res.json({status:true,result:pyqs});
    } catch (error) {
        console.log("get pyq client error",error);
    }

}
const Searchapi=async(req,res)=>{
    const {searchpyq}=req.query;
    try {
    if(!searchpyq||searchpyq.trim()===""){
        return res.json({status:false,message:"Please enter college name"});
    }
    const teachers=await Teachermodel.find({
        "PYQ_upload.college_name":{
            $regex:searchpyq.trim(),
            $options:"i"
        }
    });
    const pyqs=teachers.flatMap((teacher)=>{
       return  teacher.PYQ_upload.filter((pyq)=>
            pyq.college_name.toLowerCase().includes(searchpyq.trim().toLowerCase())
        );
       
    });
     if(pyqs.length===0){
            return res.json({status:false,message:"PYQ not found",result:[]});
    }
    return res.json({status:true,result:pyqs});
    

    } catch (error) {
        console.log("search api error",error);
    }

}
export {Addpyq,Getpyqteacher,Deletepyq,Getpyqclient,Searchapi};