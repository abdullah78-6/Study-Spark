import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { control } from '../Redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Pdfviewer from './Pdfviewer'
import { useDebounce } from 'use-debounce';
import { useDebouncedCallback } from 'use-debounce';
const Pyq = ({url}) => {
const dispatch=useDispatch();
  const pyqclient=useSelector(state=>state.main.pyqclient);
  const searchpyq=useSelector(state=>state.main.searchpyq);
  const [chk,setchk]=useState(false);
  const debounced=useDebouncedCallback((value)=>{
  dispatch(control.setsearchpyq(value))
  },1000)
  const Fetchpyq=async()=>{
    try {
      const res=await axios.get(url+"/api/pyq/get_pyq_client",{
        withCredentials:true
      });
      if(res.data.status){
        dispatch(control.setpyqclient(res.data.result));
      }
    } catch (error) {
      console.log("fetch pyq client error",error);
    }
  }
  const Searchapi=async()=>{
    try {
      const res=await axios.get(url+"/api/pyq/search",{
        withCredentials:true,
        params:{searchpyq}
      })
      if(res.data.status){
        dispatch(control.setpyqclient(res.data.result));
      }
      else{
        dispatch(control.setpyqclient([]));
      }
    } catch (error) {
      console.log("search api error",error);
    }
    
    
  }
  useEffect(()=>{
  if(searchpyq.trim()===""){
    Fetchpyq();
  }
  else{
  Searchapi();
}
},[searchpyq])
  return (
    <div>
      
      <Navbar url={url}/>
      {pyqclient.length===0&&<h1>No pyq Found </h1>}
      <input onChange={(e)=>debounced(e.target.value)} type="text"placeholder='Search by college '/>
      {pyqclient.map((i,index)=>(
        <div key={i._id}>
          <div className={`${chk?"hidden":"block"}`}>
          <h1>srno:{index+1}</h1>
          <h1>Teacher name:{i.authorname}</h1>
          <h1>subject:{i.subject}</h1>
          <h1 className='text-4xl'>collegename:{i.college_name}</h1>
          <h1>status:{i.status}</h1>
          <h1>price:₹{i.price}</h1>
          </div>
        {!chk?  <button onClick={()=>setchk(true)}>View PYQ</button>:<button onClick={()=>setchk(false)}>Close</button>}
          {chk&&<Pdfviewer pdfurl={i.filename}/>}
          
          <button>BUY NOW</button>
        </div>
      ))}
      <Footer/>
        
    </div>
  )
}

export default Pyq
