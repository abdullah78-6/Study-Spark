import mongoose from "mongoose"
const Teacherschema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    Course_upload:{type:Array,default:[]}
})
const Teachermodel=mongoose.model("Teacher-model",Teacherschema);
export default Teachermodel;