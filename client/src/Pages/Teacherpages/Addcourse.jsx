import React from 'react'
import { control } from '../../Redux/slice'
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import {toast} from "react-hot-toast"
import { ClipLoader } from "react-spinners";
const Addcourse = ({url}) => {
  const dispatch=useDispatch();
  const image=useSelector(state=>state.main.image)
  const backendemail2=useSelector(state=>state.main.backendemail2);
  const Coursedata=useSelector(state=>state.main.Coursedata);
  const courseloading=useSelector(state=>state.main.courseloading);
  const Onchangehandler=(e)=>{
    dispatch(control.setCoursedata({
      name:e.target.name,
      value:e.target.value
    }))

  }
  const Addcourse=async(e)=>{
    e.preventDefault()
    if(!backendemail2){
      toast.error("Teacher Login Required")
      return ;
    }
    if(!image){
      toast.error("Image is required");
      return ;
    }
    const formdata=new FormData();
    formdata.append("name",Coursedata.name);
    formdata.append("module",Coursedata.module);
    formdata.append("description",Coursedata.description);
    formdata.append("image",image)
    dispatch(control.setcourseloading(true));
    try {
      dispatch(control.setcourseloading(true));
      const res=await axios.post(url+"/api/course/addcourse",formdata,{
        withCredentials:true
     });
     if(res.data.status){
      toast.success(res.data.message);
      dispatch(control.setcourseloading(false));
     }
     else{
      toast.error(res.data.message);
      dispatch(control.setcourseloading(false));
     }
      
    } catch (error) {
      console.log("add course error",error)
      dispatch(control.setcourseloading(false));
      
    }

  }
  return (
    <div className='flex justify-center items-center'>
      {courseloading&&<ClipLoader/>}
     <form onSubmit={Addcourse} className='flex flex-col'>
    
      <label htmlFor='image'>
      <img src={`${image?URL.createObjectURL(image):`/src/assets/upload_area.png`}`} alt="Course Thumbnail" className='w-30'/>
      </label>
      <input onChange={(e)=>dispatch(control.setimage(e.target.files[0]))} type="file" id="image" className='hidden'/>
      <label htmlFor='name'>Course Name</label>
      <input onChange={Onchangehandler} name="name" value={Coursedata.name} id="name" required type="text"placeholder='Course Name'/>
      <label htmlFor='Description'>Course Description</label>
      <input onChange={Onchangehandler} name="description" value={Coursedata.description} id="Description" required type="text"placeholder='Course Description'/>
      <label htmlFor='module'>Course Modules</label>
      <input onChange={Onchangehandler} name="module" value={Coursedata.module}  id="module" required type="number"placeholder='Total Modules'/>
      <button type="submit">add course</button>

     </form>
     
      
    </div>
  )
}

export default Addcourse
