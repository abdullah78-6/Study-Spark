import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import {Routes,Route} from "react-router-dom"
function App() {
  const url="http://localhost:5000"
  return (
    <div>
      
   <Routes>
    <Route path="/Login" element={<Signup url={url}/>}></Route>
    <Route path="/" element={<Home url={url}/>}></Route>
   </Routes>
      
    </div>

  )
}

export default App
