import Usermodel from "../models/auth-user-model.js";
import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"
const createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}
const Signup=async(req,res)=>{
    const {name,email,password}=req.body;
    
    try {
        if(!name||!email||!password){
            return res.json({status:false,message:"All Fields Required For Signup"});
        }
        const user=await Usermodel.findOne({email});
        if(user){
            return res.json({status:false,message:"User Already Exist"});
        }
        if(password.length<8){
            return res.json({status:false,message:"Please Enter Strong Password"});
        }
        if(!validator.isEmail(email)){
            return res.json({status:false,message:"Please Enter Correct Email"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashhedpassword=await bcrypt.hash(password,salt);
        const newuser=new Usermodel({
            name:name,
            email:email,
            password:hashhedpassword,
            
        })
        const finaluser=await newuser.save();
        return res.json({status:true,message:"User Account Created"});
        
    } catch (error) {
        res.json({status:false,message:"Signup Error In Server"});
        console.log("Signup error ",error);
    }

}
const Signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await Usermodel.findOne({email});
        if(!user){
            return res.json({status:false,message:"User Not Exist"});
        }
       const ismatch=await bcrypt.compare(password,user.password);
       if(!ismatch){
        return res.json({status:false,message:"Password Is Wrong"});
       }
       const token=await createtoken(user._id);
       res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:24*60*60*1000
     })
     return res.json({status:true,message:"Login Successfull",email:user.email});
      
        
    } catch (error) {
        res.json({status:false,message:"Signin Server Error"})
        console.log("Login error",error);
    }

}
const Getprofile=async(req,res)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.json({status:false,message:"Not Authorized"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await Usermodel.findById(decoded.id).select("email");
        if(!user){
            return res.json({status:false,message:"User Is not There"});
        }
        return res.json({status:true,email:user.email});
    } catch (error) {
        console.log("Getprofile error",error);
    }


}
const Logout=async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
           
        })
        return res.json({status:true,message:"User Logout"});
    } catch (error) {
        console.log("Logout error",error);
    }

}
const GoogleLogin=async(req,res)=>{
    const {email}=req.body;
      try{  
            const user=await Usermodel.findOne({email});
            if(!user){
                return res.json({status:false,message:"USER DOES NOT EXIST "});
            }
            const token=createtoken(user._id);
            res.cookie("token",token,{
                httpOnly:true,
                secure:false,
                sameSite:"strict",//strict for local server
                maxAge:24*60*60*1000
            })
    
            return res.json({status:true,email:email,message:"Google Authentication Complete"});
    
        }        
     catch (error) {
        console.log("google login error ",error);
        
    }

}
export {Signup,Signin,Getprofile,Logout,GoogleLogin}

