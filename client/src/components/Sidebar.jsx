import React, { useEffect } from 'react'
import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import toast from "react-hot-toast"
import { control } from '../Redux/slice'
import {useNavigate} from "react-router-dom"
const Sidebar = ({url}) => {
    const dispatch=useDispatch();
    const backendemail2=useSelector(state=>state.main.backendemail2);
    const navigate=useNavigate()
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
      
    }
    useEffect(()=>{
      Fetch2();

    },[])
    const Logout=async(e)=>{
        e.preventDefault();
          const response=await axios.post(url+"/api/teach/Logout",{},{
            withCredentials:true
        });
        if(response.data.status){
            dispatch(control.setbackendemail2(""));
            
            
        toast.success(response.data.message);

        }
        else{
            toast.error(response.data.message);
        }

    }
  return (
    <div>
      <h1>this is a sidebar content </h1>
        {backendemail2}
        {backendemail2?<button onClick={Logout}>Logout</button>:<button onClick={()=>navigate("/login")}>Login</button>}
      
    </div>
  )
}

export default Sidebar
