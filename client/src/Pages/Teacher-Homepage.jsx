import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Teacher_Navbar from '../components/Teacher-Navbar'
import Sidebar from '../components/Sidebar'
import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import { control } from '../Redux/slice'
import {Routes,Route} from "react-router-dom"
import Addcourse from './Teacherpages/Addcourse'
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
    <div className='min-h-screen bg-sky-50/50'>
        <Teacher_Navbar url={url}/>
        {/* <hr/> */}
        <div className='flex  min-h-[calc(100vh-64px)] '>
        <Sidebar url={url}/>
        <main className='flex-1  min-w-0 p-4 sm:p-6'>
          <Outlet/>
        </main>
        </div>
        
    </div>
  )
}

export default Teacher_Homepage
