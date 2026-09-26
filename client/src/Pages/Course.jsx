import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { control } from '../Redux/slice'
import axios from "axios"
import {useSelector,useDispatch} from "react-redux"
const Course = ({url}) => {
  const dispatch=useDispatch();
  const studentcourse=useSelector(state=>state.main.studentcourse);
  const Fetchcourse=async()=>{
    try {
      const res=await axios.get(url+"/api/course/getcourse",{
        withCredentials:true
      });
      if(res.data.status){
        dispatch(control.setstudentcourse(res.data.result));
      }
    } catch (error) {
      console.log("error while getting a student course ");
      
    }
  }
  useEffect(()=>{
    Fetchcourse();
  },[])
  return (
    <div>
    <Navbar url={url}/>
    <div>
      {studentcourse.map((i,index)=>{
        return <div key={i.id}>
          <div>
          <img className='w-20' src={i.image_address} alt={i.name}/>
          <h1>CourseName:{i.name}</h1>
          <h1>TotalModules:{i.module}</h1>
          <button>Details</button>
          </div>

        </div>
      })}
    </div>
        
        <Footer url={url}/>
      
    </div>
  )
}
export default Course
