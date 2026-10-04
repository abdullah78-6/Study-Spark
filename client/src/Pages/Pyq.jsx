import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { control } from '../Redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
const Pyq = ({url}) => {
  const dispatch=useDispatch();
  const pyqclient=useSelector(state=>state.main.pyqclient);
  const searchpyq=useSelector(state=>state.main.searchpyq);
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
  useEffect(()=>{
    Fetchpyq();
  },[]);
  const Searchapi=()=>{
    setTimeout(()=>{
      console.log(" search api data ",searchpyq);
    },4000);
    
  }
  useEffect(()=>{
    
      Searchapi();
    
    
  },[searchpyq])
  return (
    <div>
      
      <Navbar url={url}/>
      {pyqclient.length===0&&<h1>No pyq is present here </h1>}
      <input onChange={(e)=>dispatch(control.setsearchpyq(e.target.value))} type="text"placeholder='search pyq'/>
      {pyqclient.map((i,index)=>(
        <div key={i._id}>
          <h1>srno:{index+1}</h1>
          <h1>Teacher name:{i.authorname}</h1>
          <h1>subject:{i.subject}</h1>
          <h1>collegename:{i.college_name}</h1>
          <h1>status:{i.status}</h1>
          <h1>price:₹{i.price}</h1>
          <a href={i.filename} target='_blank'>Preview</a>
          <button>BUY NOW</button>
        </div>
      ))}
      <Footer/>
        
    </div>
  )
}

export default Pyq
