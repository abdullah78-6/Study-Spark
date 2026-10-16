import { Teachermodel } from "../models/Teacher-auth-model.js";
import Cloudinary from "../utils/cloudinary.js";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_API_KEY,
api_secret:process.env.CLOUD_API_SECRET  
});
import Razorpay from "razorpay"
import crypto from "crypto"
import Usermodel from "../models/auth-user-model.js";
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
const Notes_payment=async(req,res)=>{
    try {
        const { _id } = req.body;
    
        if (!req.user?.id) {
          return res.status(401).json({
            status: false,
            message: "Student login required",
          });
        }
    
        if (!_id || !/^[a-f\d]{24}$/i.test(String(_id))) {
          return res.status(400).json({
            status: false,
            message: "A valid Notes ID is required",
          });
        }
    
        if (
          !process.env.RAZORPAY_API_KEY ||
          !process.env.RAZORPAY_API_SECRET
        ) {
          return res.status(500).json({
            status: false,
            message: "Razorpay credentials are missing in the server environment",
          });
        }
    
        const teacher = await Teachermodel.findOne({
          "Notes_upload._id": _id,
        });
    
        if (!teacher) {
          return res.status(404).json({
            status: false,
            message: "Notes not found in teacher uploads",
          });
        }
    
        const course = teacher.Notes_upload.id(_id);
    
        if (!course) {
          return res.status(404).json({
            status: false,
            message: "Notes not found",
          });
        }
    
        const student = await Usermodel.findById(req.user.id);
    
        if (!student) {
          return res.status(404).json({
            status: false,
            message: "Student not found",
          });
        }
    
        const alreadyEnrolled = student.Student_Notes_Enrollment.some(
          (item) =>
            String(item.course_id ?? item._id) === String(course._id)
        );
    
        if (alreadyEnrolled) {
          return res.status(409).json({
            status: false,
            message: "You are already purchase  this Notes",
          });
        }
    
        const coursePrice = Number(course.price);
        const totalAmount = coursePrice ;
    
        if (
          !Number.isFinite(coursePrice) ||
          coursePrice <= 0 ||
          !Number.isSafeInteger(Math.round(totalAmount * 100))
        ) {
          return res.status(400).json({
            status: false,
            message: "Invalid Notes ",
          });
        }
    
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_API_KEY,
          key_secret: process.env.RAZORPAY_API_SECRET,
        });
    
        const order = await razorpay.orders.create({
          amount: Math.round(totalAmount * 100),
          currency: "INR",
          receipt: `Notes_${String(course._id)}_${Date.now()}`,
          notes: {
            course_id: String(course._id),
            student_id: String(student._id),
          },
        });
        // STORE IN student notes enrollment if verify payment bug not fixed 
        return res.status(200).json({
          status: true,
          order_id: order.id,
          currency: order.currency,
          amount: order.amount,
          key: process.env.RAZORPAY_API_KEY,
          course_id: String(course._id),
        });
      } catch (error) {
        console.error(
          "Enrollment payment error:",
          error.error || error.message || error
        );
    
        return res.status(500).json({
          status: false,
          message:
            error.error?.description ||
            "Unable to create Razorpay order",
        });
      }

}
// CHANGE COURSE TO NOTES IN VERIFY PAYMENT CONTROLLER

const Verifypayment=async(req,res)=>{
      try {
        const {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          course_id,
        } = req.body;
    
        if (!req.user?.id) {
          return res.status(401).json({
            status: false,
            message: "Student login required.",
          });
        }
    
        if (
          !razorpay_order_id ||
          !razorpay_payment_id ||
          !razorpay_signature ||
          !course_id
        ) {
          return res.status(400).json({
            status: false,
            message: "Payment details are incomplete.",
          });
        }
    
        const key = process.env.RAZORPAY_API_KEY;
        const secret = process.env.RAZORPAY_API_SECRET;
    
        if (!key || !secret) {
          return res.status(500).json({
            status: false,
            message: "Razorpay credentials are missing.",
          });
        }
    
        // 1. Verify the checkout signature.
        const expectedSignature = crypto
          .createHmac("sha256", secret)
          .update(`${razorpay_order_id}|${razorpay_payment_id}`)
          .digest("hex");
    
        const expectedBuffer = Buffer.from(expectedSignature, "hex");
        const receivedBuffer = Buffer.from(razorpay_signature, "hex");
    
        if (
          !/^[a-f\d]{64}$/i.test(razorpay_signature) ||
          expectedBuffer.length !== receivedBuffer.length ||
          !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
        ) {
          return res.status(400).json({
            status: false,
            message: "Invalid Razorpay signature.",
          });
        }
    
        // 2. Find the course and logged-in student.
        const teacher = await Teachermodel.findOne({
          "Course_upload._id": course_id,
        });
    
        if (!teacher) {
          return res.status(404).json({
            status: false,
            message: "Course not found.",
          });
        }
    
        const course = teacher.Course_upload.id(course_id);
    
        if (!course) {
          return res.status(404).json({
            status: false,
            message: "Course not found.",
          });
        }
    
        const student = await Usermodel.findById(req.user.id);
    
        if (!student) {
          return res.status(404).json({
            status: false,
            message: "Student not found.",
          });
        }
    
        const alreadyEnrolled = (
          student.Student_Course_Enrollment || []
        ).some(
          (item) =>
            String(item.course_id ?? item._id) === String(course._id)
        );
    
        // 3. Fetch the real payment and order from Razorpay.
        const razorpay = new Razorpay({
          key_id: key,
          key_secret: secret,
        });
    
        let [payment, order] = await Promise.all([
          razorpay.payments.fetch(razorpay_payment_id),
          razorpay.orders.fetch(razorpay_order_id),
        ]);
    
        const expectedAmount = Math.round(
          (Number(course.price) + Number(course.gst ?? 0)) * 100
        );
    
        console.log("Payment verification diagnostics:", {
          payment_id: payment.id,
          payment_status: payment.status,
          payment_order_id: payment.order_id,
          payment_amount: payment.amount,
          order_id: order.id,
          order_status: order.status,
          order_amount: order.amount,
          expected_amount: expectedAmount,
        });
    
        // 4. Confirm this payment/order belongs to this student and course.
        if (
          payment.order_id !== razorpay_order_id ||
          order.id !== razorpay_order_id
        ) {
          return res.status(400).json({
            status: false,
            message: "Payment ID and order ID do not match.",
          });
        }
    
        if (
          payment.amount !== expectedAmount ||
          order.amount !== expectedAmount ||
          payment.currency !== "INR" ||
          order.currency !== "INR"
        ) {
          return res.status(400).json({
            status: false,
            message: "Payment amount or currency does not match the course fee.",
          });
        }
    
        if (
          order.notes?.course_id !== String(course._id) ||
          order.notes?.student_id !== String(student._id)
        ) {
          return res.status(400).json({
            status: false,
            message: "This order does not belong to this student and course.",
          });
        }
    
        // A repeat verification should not create another enrollment.
        if (alreadyEnrolled) {
          return res.status(200).json({
            status: true,
            message: "You are already enrolled in this course.",
          });
        }
    
        // 5. Capture only an authorized payment, after all checks above.
        if (payment.status === "authorized") {
          try {
            await razorpay.payments.capture(
              razorpay_payment_id,
              expectedAmount,
              "INR"
            );
    
            // Fetch the updated status after capture.
            payment = await razorpay.payments.fetch(razorpay_payment_id);
            order = await razorpay.orders.fetch(razorpay_order_id);
          } catch (captureError) {
            console.error(
              "Razorpay capture error:",
              captureError.error || captureError
            );
    
            return res.status(409).json({
              status: false,
              payment_status: payment.status,
              message:
                captureError.error?.description ||
                "Payment is authorized but could not be captured. Check Razorpay Dashboard; do not pay again yet.",
            });
          }
        }
    
        // 6. Enroll only when Razorpay confirms the payment is captured.
        if (payment.status !== "captured") {
          return res.status(409).json({
            status: false,
            payment_status: payment.status,
            message: `Razorpay payment status is "${payment.status}". Enrollment has not been completed.`,
          });
        }
    
        // Recheck order metadata and payment after capture.
        if (
          payment.order_id !== razorpay_order_id ||
          payment.amount !== expectedAmount ||
          payment.currency !== "INR" ||
          order.notes?.course_id !== String(course._id) ||
          order.notes?.student_id !== String(student._id)
        ) {
          return res.status(409).json({
            status: false,
            message:
              "Payment was captured, but the final order check failed. Contact support before retrying.",
          });
        }
    
        student.Student_Course_Enrollment.push({
          course_id: String(course._id),
          name: course.name,
          image_address: course.image_address,
          price: Number(course.price),
          gst: Number(course.gst ?? 0),
          payment_id: payment.id,
          order_id: order.id,
          payment_status: true,
          enrolled_at: new Date(),
        });
    
        await student.save();
    
        console.log("Enrollment saved successfully:", {
          student_id: String(student._id),
          course_id: String(course._id),
          payment_id: payment.id,
        });
    
        return res.status(200).json({
          status: true,
          message: "Payment verified and enrollment successful!",
        });
      } catch (error) {
        console.error(
          "Payment verification error:",
          error.error || error
        );
    
        return res.status(500).json({
          status: false,
          message:
            error.error?.description ||
            error.message ||
            "Unexpected server error during payment verification.",
        });
      }

}
export {Addnotes,Getnotes,Deletenotes,Getnotesclient,Notes_payment,Verifypayment}