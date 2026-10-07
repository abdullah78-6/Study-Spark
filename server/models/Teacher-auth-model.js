import mongoose from "mongoose"
const Courseschema=new mongoose.Schema({
    name:{type:String,require:true},
    module:{type:String,require:true},
    description:{type:String,require:true},
    image_address:{type:String,require:true},
    Fileid:{type:String,require:true},
    urls:{type:Array,require:true},
    demo:{type:String,require:true}
});
const Quizschema=new mongoose.Schema({
    questions:{type:Array,require:true},
    subject:{type:String,require:true}
})
const Notesschema=new mongoose.Schema({
    authorname:{type:String,require:true},
    subject:{type:String,require:true},
    status:{type:String,require:true},
    price:{type:String,default:"0"},
    filename:{type:String,require:true},
    public_id:{type:String,require:true},
    resource_type:{type:String,require:true},
    localfile:{type:String,require:true},
})
const pyqschema=new mongoose.Schema({
    authorname:{type:String,require:true},
    college_name:{type:String,require:true},
    subject:{type:String,require:true},
    status:{type:String,require:true},
    price:{type:String,default:"0"},
    filename:{type:String,require:true},
    public_id:{type:String,require:true},
    resource_type:{type:String,require:true},
    localfile:{type:String,require:true},
})
const Teacherschema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    Course_upload:{type:[Courseschema],default:[]},
    Quiz_upload:{type:[Quizschema],default:[]},
    Notes_upload:{type:[Notesschema],default:[]},
    PYQ_upload:{type:[pyqschema],default:[]}
},{minimize:false})
const Teachermodel=mongoose.model("Teacher-model",Teacherschema);
const Coursemodel=mongoose.model("Course-Model",Courseschema);
export {Teachermodel,Coursemodel};