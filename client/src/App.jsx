import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import {Routes,Route} from "react-router-dom"
import Teacher_Homepage from "./Pages/Teacher-Homepage"
import Addcourse from "./Pages/Teacherpages/Addcourse"
import Course from "./Pages/Course"
import Footer from "./components/Footer"
import Displayteachercourse from "./Pages/Teacherpages/Displayteachercourse"
function App() {
  const url="http://localhost:5000"
  return (
    <div>
  
   <Routes>
    
    <Route path="/Login" element={<Signup url={url}/>}></Route>
    <Route path="/" element={<Home url={url}/>}></Route>
    <Route path="/course" element={<Course url={url}/>}></Route>
    
    <Route path="/teacher_page" element={<Teacher_Homepage url={url}/>}>
    <Route path="addcourse" element={<Addcourse url={url}/>}></Route>
    <Route path="Totalcourses" element={<Displayteachercourse url={url}/>}></Route>
    </Route>
    
   </Routes>
      
    </div>

  )
}

export default App
