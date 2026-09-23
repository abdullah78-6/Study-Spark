import {mongoose} from "mongoose"
const Dbconnect=async()=>{
    try {
    await mongoose.connect(process.env.MONGODB_URI)        
    console.log("Db connect sucessfully");
    } catch (error) {
        console.log("Db connection error",error)
        
    }

}
export default Dbconnect