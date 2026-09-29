import mongoose from "mongoose"
const Feedbackschema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    subject:{type:String,require:true},
    message:{type:String,require:true}
})
const Feedbackmodel=mongoose.model("feedback-model",Feedbackschema);
export default Feedbackmodel;