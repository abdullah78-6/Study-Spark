import Usermodel from "../models/auth-user-model.js";
import {Coursemodel, Teachermodel} from "../models/Teacher-auth-model.js";
import imagekit from "../utils/imagekit.js"
import fs from "fs"
import Razorpay from "razorpay"
import crypto from "crypto"
const Addcourse=async(req,res)=>{
    try {
        const {name,module,description,demo,outcome,feature,gst,price}=req.body;
        const urls=JSON.parse(req.body.urls||"[]");
        if(!name||!module||!description||urls.length===0||!demo||!outcome||!feature||!price){
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
            Fileid:result.fileId,
            urls:urls,
            demo:demo,
            outcome:outcome,
            feature:feature,
            price:price,
            gst:gst

        }
        user.Course_upload.push(data);
        const newcourse=new Coursemodel({
            name:name,
            module:module,
            description:description,
            image_address:result.url,
            Fileid:result.fileId,
            demo:demo,
            outcome:outcome,
            feature:feature,
            urls:urls,
            price:price,
            gst:gst

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
            return res.json({status:false,message:"Teacher not Authenticated"})
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
// const Enroolement_payment=async(req,res)=>{
//     try {
//         const {_id}=req.body;
//         if(!req.user?.id){
//             return res.json({status:false,message:"Student Login Required"});
//         }
//         if(!_id){
//             return res.json({status:false,mssage:"Course ID is required"});
//         }
//         const teacher=await Teachermodel.findOne({
//             "Course_upload._id":_id
//         });
//         if(!teacher){
//             return res.json({status:false,message:"Course not found in teacher uploads"});
//         }
//         const course=teacher.Course_upload.id(_id);
//         if(!course){
//             return res.json({status:false,message:"Course not found"});
//         }
//         const student=await Usermodel.findById(req.user.id);
//         if(!student){
//             return res.json({status:false,message:"Student not found"});
//         }
//         const alreadyenrolled=student.Student_Course_Enrollment.some(
//             (item)=>
//                 String(item.course_id||item._id===String(_id))

//         );
//         if(alreadyenrolled){
//             return res.json({status:false,message:"You are already enrolled in this course"});
//         }
//         const totalamount=Number(course.price)+Number(course.gst||0);
//         if(!Number.isFinite(totalamount)||totalamount<=0){
//             return res.json({status:false,message:"Invalid course price"});
//         }
//        const instance=new Razorpay({
//         key_id:process.env.RAZORPAY_API_KEY,
//         key_secret:process.env.RAZORPAY_API_SECRET
//        });
//         const order=await instance.orders.create({
//             amount:Math.round(totalamount*100),
//             currency:"INR",
//             receipt:`course_${String(_id)}_${Date.now()}`,
//             notes:{
//                 course_id:String(_id),
//                 student_id:String(student._id)
//             }
//         });
//         return res.json({status:true,order_id:order.id,currency:order.currency,amount:order.amount,key:process.env.RAZORPAY_API_KEY,course_id:String(course._id)})
        
        
        
        
//     } catch (error) {
//         console.log("Enroolement payment error",error);
//     }
// }
// const Payment_verifivation=async(req,res)=>{
//     try {
//    const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       course_id,
//     } = req.body
//     if(!req.user?.id){
//          return res.status(401).json({
//         status: false,
//         message: "Student login required",
//       });
//     }
//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature ||
//       !course_id
//     ) {
//       return res.status(400).json({
//         status: false,
//         message: "Payment details are incomplete",
//       });
//     }
//     const secret=process.env.RAZORPAY_API_SECRET
//     const expectedsignature=crypto.createHmac("sha256",secret)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest("hex")
//     if(expectedBuffer.length !== receivedBuffer.length ||!crypto.timingSafeEqual(expectedBuffer, receivedBuffer)){
//          return res.status(400).json({
//         status: false,
//         message: "Invalid payment signature",
//       });
//     }
//     const teacher=await Teachermodel.findOne({
//         "Course_upload._id":course_id,
//     })
//     if(!teacher){
//         return res.json({status:false,message:"Course not found"});
//     }
//     } catch (error) {
//         console.log("payment verification error",error);
//     }
//      const course = teacher.Course_upload.id(course_id);

//     const student = await Usermodel.findById(req.user.id);

//     if (!student) {
//       return res.status(404).json({
//         status: false,
//         message: "Student not found",
//       });
//     }

//     const alreadyEnrolled = student.Student_Course_Enrollment.some(
//       (item) =>
//         String(item.course_id || item._id) === String(course_id)
//     );

//     if (alreadyEnrolled) {
//       return res.status(200).json({
//         status: true,
//         message: "You are already enrolled in this course",
//       });
//     }

//     const expectedAmount = Math.round(
//       (Number(course.price) + Number(course.gst || 0)) * 100
//     );

//     const instance = new Razorpay({
//       key_id: process.env.RAZORPAY_API_KEY,
//       key_secret: secret,
//     });

//     // Confirm payment with Razorpay, not just the browser response.
//     const payment = await instance.payments.fetch(razorpay_payment_id);

//     if (
//       payment.order_id !== razorpay_order_id ||
//       payment.status !== "captured" ||
//       payment.amount !== expectedAmount ||
//       payment.currency !== "INR"
//     ) {
//       return res.status(400).json({
//         status: false,
//         message: "Payment is not confirmed or amount does not match",
//       });
//     }

//     // Ensure the payment belongs to an order created for this student/course.
//     const order = await instance.orders.fetch(razorpay_order_id);

//     if (
//       order.status !== "paid" ||
//       order.amount !== expectedAmount ||
//       order.currency !== "INR" ||
//       order.notes?.course_id !== String(course_id) ||
//       order.notes?.student_id !== String(student._id)
//     ) {
//       return res.status(400).json({
//         status: false,
//         message: "Order details do not match",
//       });
//     }

//     student.Student_Course_Enrollment.push({
//       course_id: String(course._id),
//       name: course.name,
//       image_address: course.image_address,
//       price: course.price,
//       gst: course.gst,
//       payment_id: razorpay_payment_id,
//       order_id: razorpay_order_id,
//       payment_status: true,
//       enrolled_at: new Date(),
//     });

//     await student.save();

//     return res.status(200).json({
//       status: true,
//       message: "Payment verified and enrollment successful",
//     });

// }
const Enroolement_payment = async (req, res) => {
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
        message: "A valid course ID is required",
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
      "Course_upload._id": _id,
    });

    if (!teacher) {
      return res.status(404).json({
        status: false,
        message: "Course not found in teacher uploads",
      });
    }

    const course = teacher.Course_upload.id(_id);

    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    const student = await Usermodel.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        status: false,
        message: "Student not found",
      });
    }

    const alreadyEnrolled = student.Student_Course_Enrollment.some(
      (item) =>
        String(item.course_id ?? item._id) === String(course._id)
    );

    if (alreadyEnrolled) {
      return res.status(409).json({
        status: false,
        message: "You are already enrolled in this course",
      });
    }

    const coursePrice = Number(course.price);
    const tuitionFee = Number(course.gst ?? 0);
    const totalAmount = coursePrice + tuitionFee;

    if (
      !Number.isFinite(coursePrice) ||
      !Number.isFinite(tuitionFee) ||
      coursePrice <= 0 ||
      tuitionFee < 0 ||
      !Number.isSafeInteger(Math.round(totalAmount * 100))
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid course price or tuition fee",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `course_${String(course._id)}_${Date.now()}`,
      notes: {
        course_id: String(course._id),
        student_id: String(student._id),
      },
    });

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
};


const Payment_verifivation = async (req, res) => {
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
};


export {Addcourse,Deletecourse,Getcourse,Getcourse_teacher,Enroolement_payment,Payment_verifivation}
