import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { control } from '../Redux/slice'
import Hero from './Hero'
const Home = ({url}) => {
    const Fetch=async()=>{
      try {
        const res=await axios.get(url+"/api/auth/getprofile",{
          
          withCredentials:true
        });
        if(res.data.status){
          dispatch(control.setbackendemail(res.data.email));
          
        }

      } catch (error) {
        console.log("fetch profile server",error);
        
      }
      
    }
    
    useEffect(()=>{
      Fetch();

    },[])
return (
    <div>
      <Navbar url={url}/>
      <Hero/>
      
    </div>
  )
}

export default Home
