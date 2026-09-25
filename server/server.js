import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import Dbconnect from "./utils/Db.js"
import Userauthrouter from "./routes/user-auth-route.js"
import Teacherrouter from "./routes/Teacher-auth-route.js"
import Courserouter from "./routes/Course-route.js"
const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
Dbconnect();
app.get("/",(req,res)=>{
    try{
        return res.status(200).send({message:"Server is ready to work"})
    }
    catch(e){
        console.log(e)
    }
    

})
app.use("/api/auth/",Userauthrouter);
app.use("/api/teach/",Teacherrouter);
app.use("/api/course/",Courserouter);
const port=process.env.PORT
app.listen(port,()=>{
    console.log("server is listning on ",port);
})
