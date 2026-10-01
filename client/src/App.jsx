import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import {Routes,Route,Navigate} from "react-router-dom"
import Teacher_Homepage from "./Pages/Teacher-Homepage"
import Addcourse from "./Pages/Teacherpages/Addcourse"
import Course from "./Pages/Course"
import Footer from "./components/Footer"
import Displayteachercourse from "./Pages/Teacherpages/Displayteachercourse"
import Addquiz from "./Pages/Teacherpages/Addquiz"
import Displayquiz from "./Pages/Teacherpages/Displayquiz"
import Quiz from "./Pages/Quiz"
import Quizdetails from "./Pages/Quizdetails"
import Contact from "./Pages/Contact-us"
import Feedback from "./Pages/Teacherpages/Feedback"
import { control } from "./Redux/slice"
import { useDispatch,useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
function App() {
  const url="http://localhost:5000"
  const dispatch=useDispatch();
  const backendemail=useSelector(state=>state.main.backendemail);
  const backendemail2=useSelector(state=>state.main.backendemail2);
  const[authchk,setauthchk]=useState(true);
  const Fetch2=async()=>{
      try {
        const res=await axios.get(url+"/api/teach/getteacher",{
          
          withCredentials:true
        });
        if(res.data.status){
          dispatch(control.setbackendemail2(res.data.email));
          
        }

      } catch (error) {
        console.log("fetch profile server",error);
        
      }
      finally{
        setauthchk(false);
      }
      
    }
    useEffect(()=>{
      Fetch2();

    },[])
    if(authchk){
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-slate-500 font-medium">
            Checking your session...
          </p>

        </div>

      </div>
      )
    }
  return (
    <div>
  
   <Routes>
    
    <Route path="/Login" element={<Signup url={url}/>}></Route>
    <Route path="/" element={<Home url={url}/>}></Route>
    <Route path="/course" element={<Course url={url}/>}></Route>
    <Route path="/quiz" element={<Quiz url={url}/>}></Route>
    <Route path="/quiz_details" element={<Quizdetails url={url}/>}></Route>
    <Route path="/Contact-us" element={<Contact url={url}/>}></Route>
    <Route path="/teacher_page" element={backendemail2?<Teacher_Homepage url={url}/>:<Navigate to="/Login" replace/>}>
    <Route path="addcourse" element={<Addcourse url={url}/>}></Route>
    <Route path="Totalcourses" element={<Displayteachercourse url={url}/>}></Route>
    <Route path="addquiz" element={<Addquiz url={url}/>}></Route>
    <Route path="totalquiz" element={<Displayquiz url={url}/>}></Route>
    <Route path="feedback" element={<Feedback url={url}/>}></Route>
    </Route>
    
   </Routes>
      
    </div>

  )
}

export default App
