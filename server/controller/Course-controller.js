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
    try {
        
    } catch (error) {
        console.log('delete course error',error);
        
    }

}
const Getcourse=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log("get course error",error);
        
    }

}
export {Addcourse,Deletecourse,Getcourse}
