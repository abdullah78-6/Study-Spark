import React, { useEffect } from 'react'
import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import { control } from '../../Redux/slice';
import {toast} from "react-hot-toast"
import { ClipLoader } from "react-spinners";
const Displayteachercourse = ({url}) => {
    const Totalteachercourses=useSelector(state=>state.main.Totalteachercourses);
    const dispatch=useDispatch();
    const displayloading=useSelector(state=>state.main.displayloading);
    const Fetchcourses=async()=>{
      try {
        const res=await axios.get(url+"/api/course/getcourse_teacher",{
          withCredentials:true
        });
        if(res.data.status){
          dispatch(control.setTotalteachercourses(res.data.result));
        }
      } catch (error) {
        console.log("error while fetching a courses ",error);
        
      }

    }
    useEffect(()=>{
      Fetchcourses();
    },[]);
    const DeleteCourse=async(id,fileid)=>{
      dispatch(control.setdisplayloading(true))
      try {
        dispatch(control.setdisplayloading(true))
        const res=await axios.delete(url+"/api/course/deletecourse",{
          data:{_id:id},
           withCredentials:true
        
        })
        dispatch(control.setdisplayloading(true))
        if(res.data.status){
          toast.success(res.data.message);
          dispatch(control.setdisplayloading(false))
        }
        else{
          toast.error(res.data.message);
          dispatch(control.setdisplayloading(false))
        }
      } catch (error) {
        console.log("delete course error ",error);
        dispatch(control.setdisplayloading(false))
        
      }
      
    
    }
    
  return (
    <div>
      Total courses 
      {displayloading&&<ClipLoader/>}
      {Totalteachercourses.map((i,index)=>{
        return <div>
          <img className='w-30' src={i.image_address} alt={i.name}/>
          <h1>{i.name}</h1>
          <h1>{i.module}</h1>
          <button onClick={()=>DeleteCourse(i._id,i.Fileid)}>Delete Course</button>
        </div>

      })}
    </div>
  )
}

export default Displayteachercourse
