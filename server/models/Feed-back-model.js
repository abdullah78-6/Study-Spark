import mongoose from "mongoose"
const Feedbackschema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    subject:{type:String,require:true},
    message:{type:String,require:true},
    readBy:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Teacher-model"
            },
        ],
        default:[],
    },
},{timestamps:true})
const Feedbackmodel=mongoose.model("feedback-model",Feedbackschema);
export default Feedbackmodel;