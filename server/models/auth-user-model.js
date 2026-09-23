import mongoose from "mongoose"
const Userschema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
})
const Usermodel=mongoose.model("user-model",Userschema);
export default Usermodel;