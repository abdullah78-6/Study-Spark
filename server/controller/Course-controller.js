import {Coursemodel, Teachermodel} from "../models/Teacher-auth-model.js";
import imagekit from "../utils/imagekit.js"
import fs from "fs"
const Addcourse=async(req,res)=>{
    try {
        const {name,module,description}=req.body;
        if(!name||!module||!description){
            return res.json({status:false,message:"All Fields Are Required"});
        }
        
        const result=await imagekit.files.upload({
            file:fs.createReadStream(req.file.path),
            fileName:req.file.originalname,
            tags:["Course Thumbnail"]
        })
        const user=await Teachermodel.findById(req.user.id);
        if(!user){
            return res.json({status:false,message:"Teacher Not Found "});
        }
        console.log("Image kit uploaded image url ",result.url);
        fs.unlinkSync(req.file.path);
        const data={
            name:name,
            module:module,
            description:description,
            image_address:result.url,
            Fileid:result.fileId
        }
        user.Course_upload.push(data);
        const newcourse=new Coursemodel({
            name:name,
            module:module,
            description:description,
            image_address:result.url,
            Fileid:result.fileId

        })
        await user.save();
        await newcourse.save();
        return res.json({status:true,message:"Course Upload Successfully"});
        
        
    } catch (error) {
        console.log("add course error",error);
        
    }

}
const Deletecourse=async(req,res)=>{
    const {_id}=req.body;
    try {
        if(!req.user||!req.user.id){
            return res.json({status:false,message:"User not Authenticated"})
        }
        if(!_id){
            return res.json({status:false,message:"Database id is required"})
        }
              const teacher=await Teachermodel.findById(req.user.id);
      if(!teacher){
        return res.json({status:false,message:"Teacher not found"});
      }
      const course=teacher.Course_upload.id(_id);
      if(!course){
        return res.json({status:false,message:"Course not found"});
      }
      await imagekit.files.delete(course.Fileid);
      teacher.Course_upload.pull(_id);
      await teacher.save();
      return res.json({status:true,message:"Course Deleted Sucessfully"});
        
        
    } catch (error) {
        console.log('delete course error',error);
        
    }

}
const Getcourse=async(req,res)=>{
    try {
        const teacher=await Teachermodel.find({});
        const result=teacher.flatMap(
            teacher=>teacher.Course_upload
        );
        return  res.json({status:true,result:result});
    } catch (error) {
        console.log("get course error",error);
    }

}
const Getcourse_teacher=async(req,res)=>{
    try {
        const teacher=await Teachermodel.findById(req.user.id);
        const result=teacher.Course_upload;
        return res.json({status:true,result:result});
        
    } catch (error) {
        console.log("get course teacher error ");
        
    }

}
export {Addcourse,Deletecourse,Getcourse,Getcourse_teacher}
