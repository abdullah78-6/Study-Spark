import mongoose from "mongoose"
const Userschema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    Student_Course_Enrollment:{type:[],default:[]},
    Student_Notes_Enrollment:{type:[],default:[]},
    Student_PYQ_Enrollment:{type:[],default:[]}

})
const Usermodel=mongoose.model("user-model",Userschema);
export default Usermodel;