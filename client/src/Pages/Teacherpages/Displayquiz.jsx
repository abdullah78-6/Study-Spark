import React, { useEffect } from 'react'
import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import { control } from '../../Redux/slice';
import toast from "react-hot-toast"
const Displayquiz = ({url}) => {
  const dispatch=useDispatch();
  const totalteacherquiz=useSelector(state=>state.main.totalteacherquiz);
  const fetchquizes=async()=>{
    const res=await axios.get(url+"/api/quiz/getquizadmin",{
      withCredentials:true,
    })
    if(res.data.status){
      dispatch(control.settotalteacherquiz(res.data.result));
    }
    

  }
  useEffect(()=>{
    fetchquizes();
  },[]);
  const Deletequiz=async(id)=>{
    try {
      const res=await axios.delete(url+"/api/quiz/deletequiz",{
        data:{_id:id},
        withCredentials:true,
      })
      if(res.data.status){
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("delete quiz error ",error)
      
    }

       

  }
  return (
    <div>
      {totalteacherquiz.length===0?<h1>No Quiz Is Present</h1>:""}
      {totalteacherquiz.map((i,index)=>(
        <div key={i._id}>
        <h1>Quizno:{index+1}</h1>
        <h1>{i.subject}</h1>
        <button onClick={()=>Deletequiz(i._id)}>Delete</button>
        </div>
      ))}
      </div>
  )
}

export default Displayquiz
