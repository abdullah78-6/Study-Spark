import React, { useEffect, useState } from 'react'
import axios from "axios"
import { control } from '../../Redux/slice'
import {useDispatch,useSelector} from "react-redux"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners";
const Displaypyq =({url}) => {
const dispatch=useDispatch(); 
const[del,setdel]=useState(false); 
const pyq=useSelector(state=>state.main.pyq);
const fetchnotes=async()=>{
        try {
            const res=await axios.get(url+"/api/pyq/get_pyq",{
                withCredentials:true
            })
            if(res.data.status){
                dispatch(control.setpyq(res.data.result));
            }
            
        } catch (error) {
            console.log("get pyq error",error);
        }

    }
    useEffect(()=>{
        fetchnotes()
    },[]);
    const Delete=async(_id)=>{
        setdel(true);
    try {
  const res=await axios.delete(url+"/api/pyq/del_pyq",{
    data:{_id:_id},
    withCredentials:true
  });
  setdel(true)
  if(res.data.status){
    toast.success(res.data.message);
    setdel(false);
  } 
  else{

    toast.error(res.data.message);
    setdel(false);
  }   
  } catch (error) {
    console.log("delete pyq error",error);
    setdel(false);
    
  }

}
  return (
    <div>
          {del&&<ClipLoader/>}
          {pyq.length===0?<h1>no pyqs are present here</h1>:""}
            
            {pyq.map((i,index)=>{
                return <div id={index}>
                    <h1>Srno:{index+1}</h1>
                    <h1>Teacher name:{i.authorname}</h1>
                    <h1>Subject:{i.subject}</h1>
                    <a href={i.filename} target="_blank">File url</a>
                    <h1>{i.status}</h1>
                    <h1>{i.college_name}</h1>
                   {i.status==="free"?"":<h1>₹{i.price}</h1>} 
                   <button onClick={()=>Delete(i._id)} >Delete</button>
                </div>
    
            })}
          
        </div>
  )
}

export default Displaypyq
