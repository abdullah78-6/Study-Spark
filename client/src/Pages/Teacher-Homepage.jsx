import React, { useEffect } from 'react'
import Teacher_Navbar from '../components/Teacher-Navbar'
import Sidebar from '../components/Sidebar'
import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import { control } from '../Redux/slice'
const Teacher_Homepage = ({url}) => {
    const dispatch=useDispatch();
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
    
  return (
    <div>
        <Teacher_Navbar url={url}/>
        <Sidebar url={url}/>
      
    </div>
  )
}

export default Teacher_Homepage
