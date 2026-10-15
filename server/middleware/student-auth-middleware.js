import jwt from "jsonwebtoken"
const StudentAuthmiddleware=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.json({status:false,message:"USER IS NOT AUTHORIZED LOGIN AGAIN "});
        }
        const tokendecode=jwt.verify(token,process.env.JWT_SECRET);
        if(!req.body){
            req.body={}
        }
        // req.body.userid=tokendecode.id;
        req.user={
            id:tokendecode.id
        }
        next();
    } catch (error) {
     console.log("AUTH MIDDLEWARE ERROR ",error);
     return res.json({status:false,message:"AUTH MIDDLEWARE ERROR"});
        
    }


}
export default StudentAuthmiddleware;