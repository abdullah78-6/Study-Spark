import mongoose from "mongoose"
const Courseschema=new mongoose.Schema({
    name:{type:String,require:true},
    module:{type:String,require:true},
    description:{type:String,require:true},
    image_address:{type:String,require:true},
    Fileid:{type:String,require:true}
});
const Quizschema=new mongoose.Schema({
    questions:{type:Array,require:true},
    subject:{type:String,require:true}
})

const Teacherschema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    Course_upload:{type:[Courseschema],default:[]},
    Quiz_upload:{type:[Quizschema],default:[]}
},{minimize:false})
const Teachermodel=mongoose.model("Teacher-model",Teacherschema);
const Coursemodel=mongoose.model("Course-Model",Courseschema);
export {Teachermodel,Coursemodel};