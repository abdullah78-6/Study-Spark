import React, { useEffect, useState } from 'react'
import { control } from '../../Redux/slice'
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import {toast} from "react-hot-toast"
import { ClipLoader } from "react-spinners";
const inputClass ="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:text-base";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";
 const Addcourse = ({url}) => {
  const dispatch=useDispatch();
  const image=useSelector(state=>state.main.image)
  const backendemail2=useSelector(state=>state.main.backendemail2);
  const Coursedata=useSelector(state=>state.main.Coursedata);
  const courseloading=useSelector(state=>state.main.courseloading);
  const[urls,seturl]=useState([]);
  const[mod,setmod]=useState(false);
 const Onchangehandler=(e)=>{
    dispatch(control.setCoursedata({
      name:e.target.name,
      value:e.target.value
    }))
  
    
}
const handlerurlchange=(index,value)=>{
  seturl(prevurl=>{
    const newurl=[...prevurl]
    newurl[index]=value;
    return newurl
  })
  
 }
 const Handlesetmodules=()=>{
    const modulecount=Number(Coursedata.module);
    if(!modulecount||modulecount<1){
      toast.error("Please enter a valid number of modules");
      return 
    }
    const newurls=Array.from(
  {length:modulecount},
  ()=>""
  )
  seturl(newurls)
  setmod(true)
 
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
    if(urls.length!==Number(Coursedata.module)
    ||urls.some(item=>item.trim()==="")){
      toast.error("Please enter URL for every module");
      return ;
    }
    const formdata=new FormData();
    formdata.append("name",Coursedata.name);
    formdata.append("module",Coursedata.module);
    formdata.append("description",Coursedata.description);
    formdata.append("demo",Coursedata.demo);
    formdata.append("image",image)
    formdata.append("outcome",Coursedata.outcome);
    formdata.append("feature",Coursedata.feature);
    formdata.append("urls",JSON.stringify(urls));
    console.log(Coursedata);
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
  useEffect(()=>{
    
  },[Coursedata.module]);
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-10 sm:px-6'>
      <div className='relative w-full max-w-xl overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-600/10'>
 
        {/* Header */}
        <div className='bg-gradient-to-br from-blue-600 to-cyan-500 px-6 py-7 text-white sm:px-9 sm:py-9'>
          <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-md'>
            📚
          </div>
          <h1 className='mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl'>
            Add a new course
          </h1>
          <p className='mt-1 text-sm text-white/90 sm:text-base'>
            Fill in the details below to publish a course for your students.
          </p>
        </div>
 
        {/* Loading overlay */}
        {courseloading && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm'>
            <ClipLoader color="#2563EB" size={44} />
          </div>
        )}
 
        <form onSubmit={Addcourse} className='flex flex-col gap-5 px-6 py-7 sm:px-9 sm:py-9'>
 
          {/* Thumbnail upload */}
          <div>
            <span className={labelClass}>Course thumbnail</span>
            <label
              htmlFor='image'
              className='group flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/60 transition hover:border-blue-500 hover:bg-blue-50 focus-within:ring-4 focus-within:ring-blue-100'
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Course Thumbnail"
                  className='h-48 w-full object-cover sm:h-56'
                />
              ) : (
                <div className='flex flex-col items-center px-4 py-10 text-center'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-md'>
                    🖼️
                  </div>
                  <p className='mt-3 text-sm font-semibold text-slate-700'>
                    Click to upload an image
                  </p>
                  <p className='mt-1 text-xs text-slate-500'>PNG, JPG or WEBP</p>
                </div>
              )}
            </label>
            <input
              onChange={(e)=>dispatch(control.setimage(e.target.files[0]))}
              type="file"
              id="image"
              accept="image/*"
              className='sr-only'
            />
            {image && (
              <p className='mt-2 text-xs text-slate-500'>
                Click the image to change it.
              </p>
            )}
          </div>
 
          {/* Name */}
          <div>
            <label htmlFor='name' className={labelClass}>Course Name</label>
            <input
              onChange={Onchangehandler}
              name="name"
              value={Coursedata.name}
              id="name"
              required
              type="text"
              placeholder='e.g. Introduction to React'
              className={inputClass}
            />
          </div>
 
          {/* Description */}
          <div>
            <label htmlFor='Description' className={labelClass}>Course Description</label>
            <textarea
              onChange={Onchangehandler}
              name="description"
              value={Coursedata.description}
              id="Description"
              required
              rows={4}
              placeholder='What will students learn in this course?'
              className={`${inputClass} resize-none`}
            />
          </div>
                    <div>
            <label htmlFor='outcome' className={labelClass}>Course Outcome</label>
            <textarea
              onChange={Onchangehandler}
              name="outcome"
              value={Coursedata.outcome}
              id="outcome"
              required
              rows={4}
              placeholder='What is the outcome of this course?'
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label htmlFor='feature' className={labelClass}>Course Features</label>
            <textarea
              onChange={Onchangehandler}
              name="feature"
              value={Coursedata.feature}
              id="feature"
              required
              rows={4}
              placeholder='Describe Course Features'
              className={`${inputClass} resize-none`}
            />
          </div>

            <div>
            <label htmlFor='demo' className={labelClass}>Intro Video URL</label>
            <input
              onChange={Onchangehandler}
              name="demo"
              value={Coursedata.demo}
              id="demo"
              required
              type="url"
              placeholder='Intro Video Link'
              className={`${inputClass} resize-none`}
            />
          </div>
 
 
          {/* Modules */}
          <div>
            <label htmlFor='module' className={labelClass}>Course Modules</label>
            <input
              onChange={Onchangehandler}
              name="module"
              value={Coursedata.module}
              id="module"
              required
              min={1}
              type="number"
              placeholder='Total number of modules'
              className={inputClass}
            />
          </div>
         <button onClick={Handlesetmodules} type="button" className='mt-2 w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700'>
          {mod?"Update Modules":"Set Modules"}
         </button>
         {mod&&urls.length>0&&(
          <div>
            <label className={labelClass}>
              Add Module URLs
            </label>
            <div className='flex flex-col gap-4'>
              {urls.map((item,index)=>(
                <div key={index}>
                  <label className='mb-1 block text-sm font-medium text-slate-600' >Module {index+1} </label>
                  <input value={item}
                  onChange={(e)=>handlerurlchange(index,e.target.value)}
                  className={inputClass}
                  type="url"
                  placeholder={`Enter URL for Module ${index+1}`}
                  required
                  />
                  </div>
              ))}

            </div>
          </div>
         )}
         
          <button
            type="submit"
            disabled={courseloading}
            className='mt-2 w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base'
          >
            {courseloading ? "Adding course..." : "Add course"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addcourse
