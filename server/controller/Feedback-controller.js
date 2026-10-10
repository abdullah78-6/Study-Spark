import Feedbackmodel from "../models/Feed-back-model.js"
import {Resend} from "resend"
import { Teachermodel } from "../models/Teacher-auth-model.js";
const resend=new Resend(process.env.RESEND_APIKEY);
const Addfeedback=async(req,res)=>{
    try {
        const {name,email,subject,message}=req.body;
        if(!name||!email||!subject||!message){
            return res.json({status:false,message:"All Fields Are Required"});
        }
        const newschema=new Feedbackmodel({
            name:name,
            email:email,
            subject:subject,
            message:message,
            readBy:[],

        });
        await newschema.save();
        const data = await resend.emails.send({
         from: "onboarding@resend.dev",
        to: "abdullahqidwai49@gmail.com",
        subject: "📩 New Feedback Received - Study·Spark",
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f8ff;
            font-family: Arial, Helvetica, sans-serif;
        }

        .container {
            width: 100%;
            padding: 40px 15px;
            box-sizing: border-box;
        }

        .card {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(37, 99, 235, 0.12);
            border: 1px solid #e5edff;
        }

        .header {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            padding: 30px;
            text-align: center;
            color: white;
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 12px;
        }

        .header h1 {
            margin: 0;
            font-size: 23px;
        }

        .header p {
            margin: 8px 0 0;
            font-size: 14px;
            opacity: 0.9;
        }

        .content {
            padding: 30px;
        }

        .badge {
            display: inline-block;
            background: #eff6ff;
            color: #2563eb;
            padding: 7px 13px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .info-box {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 18px;
            margin-bottom: 20px;
        }

        .info-row {
            margin-bottom: 12px;
        }

        .info-row:last-child {
            margin-bottom: 0;
        }

        .label {
            color: #64748b;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 4px;
        }

        .value {
            color: #1e293b;
            font-size: 15px;
        }

        .feedback-box {
            background: #f8fbff;
            border-left: 4px solid #2563eb;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }

        .feedback-title {
            font-size: 14px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 10px;
        }

        .feedback-text {
            color: #475569;
            font-size: 15px;
            line-height: 1.7;
            margin: 0;
        }

        .button-wrapper {
            text-align: center;
            margin-top: 28px;
        }

        .button {
            display: inline-block;
            background: #2563eb;
            color: #ffffff !important;
            text-decoration: none;
            padding: 13px 25px;
            border-radius: 9px;
            font-size: 14px;
            font-weight: bold;
        }

        .footer {
            text-align: center;
            padding: 20px 30px;
            background: #f8fafc;
            border-top: 1px solid #e5e7eb;
        }

        .footer p {
            margin: 4px 0;
            color: #94a3b8;
            font-size: 12px;
        }

        @media only screen and (max-width: 600px) {
            .container {
                padding: 20px 10px;
            }

            .content {
                padding: 22px;
            }

            .header {
                padding: 25px 15px;
            }

            .header h1 {
                font-size: 20px;
            }
        }
    </style>
</head>

<body>

    <div class="container">

        <div class="card">

            <!-- Header -->
            <div class="header">

                <div class="logo">
                    Study·Spark
                </div>

                <h1>New Feedback Received 🎉</h1>

                <p>Your platform just received new feedback.</p>

            </div>


            <!-- Content -->
            <div class="content">

                <span class="badge">
                    NEW FEEDBACK
                </span>


                <div class="info-box">

                    <div class="info-row">
                        <div class="label">
                            From
                        </div>

                        <div class="value">
                            ${req.body.name}
                        </div>
                    </div>


                    <div class="info-row">
                        <div class="label">
                            Email
                        </div>

                        <div class="value">
                            ${req.body.email}
                        </div>
                    </div>


                    <div class="info-row">
                        <div class="label">
                            Received
                        </div>

                        <div class="value">
                            ${new Date().toLocaleString("en-IN")}
                        </div>
                    </div>

                </div>


                <!-- Feedback -->
                <div class="feedback-box">

                    <div class="feedback-title">
                        💬 Feedback Message
                    </div>

                    <p class="feedback-text">
                        ${req.body.message}
                    </p>

                </div>


                <!-- Button -->
                <div class="button-wrapper">

                    <a
                        href="mailto:${req.body.email}"
                        class="button"
                    >
                        Reply to Student
                    </a>

                </div>

            </div>


            <!-- Footer -->
            <div class="footer">

                <p>
                    This notification was generated by Study·Spark.
                </p>

                <p>
                    Keep learning. Keep growing. 🚀
                </p>

            </div>

        </div>

    </div>

</body>
</html>
`
});
console.log("email send sucesfully ",data);
return res.json({status:true,message:"Thanks For Feedback"});

        
    } catch (error) {
        console.log("Add feedback error",error);
        
    }

}
const Getfeedback=async(req,res)=>{
    try {
        const feedback=await Feedbackmodel.find({}).sort({createdAt:-1}).lean();
        return res.json({status:true,result:feedback});
    } catch (error) {
        console.log("get feedback error",error);
        
    }

}
const DeleteFeedback=async(req,res)=>{
    try {
        const {_id}=req.body;
        const feedback=await Feedbackmodel.findByIdAndDelete({_id:_id});
        if(feedback){
        return res.json({status:true,message:"Feedback Removed Sucessfully"});
        }
        else{
        return res.json({status:false,message:"Feedback not found"});
        }

    } catch (error) {
        console.log("delete feeedback error",error);
    }
    

}
const Checkfedback=async(req,res)=>{//teacher_homepage
    try {
        const teacherid=req.user.id;
        const unreadcount=await Feedbackmodel.countDocuments({
            readBy:{$ne:teacherid},
        })
        return res.json({status:true,noti:unreadcount>0,unreadcount})
    } catch (error) {
        console.log("update feedback error",error);
    }

}
const Updatefeedback=async(req,res)=>{//feedbackpage
    try {
        const teacherid=req.user.id;
        await Feedbackmodel.updateMany(
            {readBy:{$ne:teacherid}},
            {$addToSet:{readBy:teacherid}}
        );
        return res.json({status:true,noti:false,message:"Notification marked as read"});
    } catch (error) {
        console.log("update feedback error",error);
    }

}
export {Addfeedback,Getfeedback,DeleteFeedback,Checkfedback,Updatefeedback}

