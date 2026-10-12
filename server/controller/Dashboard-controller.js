import Usermodel from "../models/auth-user-model.js";
import { Teachermodel } from "../models/Teacher-auth-model.js";
const Dashboard=async(req,res)=>{
    try {
        const teacherid=req.user.id;
        if(!teacherid){
            return res.json({status:false,message:"Teacher is not authorized"});
        }
        const teacherstatus=await Teachermodel.aggregate([
            {
                $match:{
                    _id:new(await import ("mongoose")).default.Types.ObjectId(
                        teacherid
                    )
                }
            },
            {
                $project:{
                    
                    courses:{
                        $sum:{$size:{$ifNull:["$Course_upload",[]]}}
                    },
                    notes:{
                        $sum:{$size:{$ifNull:["$Notes_upload",[]]}}
                    },
                    pyq:{
                        $sum:{$size:{$ifNull:["$PYQ_upload",[]]}}
                    },
                    quizes:{
                        $sum:{$size:{$ifNull:["$Quiz_upload",[]]}}
                    },
                    feedback:{
                        $sum:{$size:{$ifNull:["$Feedback",[]]}}
                    }
                }
            }
        ]);
        const stats=teacherstatus[0]||{
            courses:0,
            notes:0,
            pyq:0,
            quizes:0,
            feedback:0

        }
        const enrollemtstats=await Usermodel.aggregate([
            {
                $group:{
                    _id:null,
                    studentenroll:{
                        $sum:{
                            $size:{
                                $ifNull:["$Student_Course_Enrollment",[]]
                            }
                        }
                    }
                }
            }
        ]);
        const studentenroll=enrollemtstats[0]?.studentenroll||0;
    return res.json({
        status:true,
        courses:stats.courses,
        notes:stats.notes,
        pyq:stats.pyq,
        studentenroll:studentenroll,
        quizes:stats.quizes,
        feedback:stats.feedback
    }) 

    } catch (error) {
        console.log("Dashboard data error",error);
    }

}
export {Dashboard}