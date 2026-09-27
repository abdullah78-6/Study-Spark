import { Teachermodel } from "../models/Teacher-auth-model.js"
const Addquiz=async(req,res)=>{
    const {quizdata}=req.body;
    try {
        const Teacher=await Teachermodel.findById(req.user.id);
        if(!Teacher){
            return res.json({status:false,message:"Teacher Not Found Login Again"})
        }
        if(!quizdata){
            return res.json({status:false,message:"Quiz Data is required"});
        }
        const data={
            subject:quizdata.subject,
            questions:quizdata
        }
        Teacher.Quiz_upload.push(data);
        await Teacher.save();
        return res.json({status:true,message:"Quiz Added Sucessfully"})
        
    } catch (error) {
        console.log("Adding quiz error")
    }
}
const Getquizadmin=async(req,res)=>{
    try {
        const Teacher=await Teachermodel.findById(req.user.id);
        if(!Teacher){
            return res.json({status:false,message:"Teacher Not Found Login Again"})
        }
        const result=Teacher.Quiz_upload;
        return res.json({status:true,result:result});
        
    } catch (error) {
        console.log("Get quiz error admin ",error);
        
    }

}
const Deletequiz=async(req,res)=>{
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
        const quiz=teacher.Quiz_upload.id(_id);
        if(!quiz){
        return res.json({status:false,message:"Quiz not found"});
      }
      teacher.Quiz_upload.pull(_id);
      await teacher.save();
      return res.json({status:true,message:"Quiz Remove Sucessfully"});
        
        
    } catch (error) {
        console.log("delete quiz error ")
        
    }


}
export {Addquiz,Getquizadmin,Deletequiz}