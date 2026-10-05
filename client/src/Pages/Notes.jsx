import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { control } from '../Redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import Pdfviewer from './Pdfviewer'
const Notes = ({url}) => {
    const dispatch=useDispatch();
    const notesclient=useSelector(state=>state.main.notesclient);
    const [chk,setchk]=useState(false);
    const Fetchnotes=async()=>{
        try {
            const res=await axios.get(url+"/api/notes/get_notes_client",{
                withCredentials:true,
            })
            if(res.data.status){
                dispatch(control.setnotesclient(res.data.result));
            }
        } catch (error) {
            console.log("fetch notes error",error);
        }
    }
    useEffect(()=>{
        Fetchnotes();
    },[])
    
return (
    <div>
      <Navbar url={url}/>
      {notesclient.length===0&&<h1>No notes is present </h1>}
      {notesclient.map((i,index)=>(
        <div key={i._id}>
           <div className={`${chk?"hidden":"block"}`}>
          <h1>srno:{index+1}</h1>
          <h1>Teacher name:{i.authorname}</h1>
          <h1>subject:{i.subject}</h1>
          <h1>status:{i.status}</h1>
          <h1>price:₹{i.price}</h1>
          </div>
          {!chk?  <button onClick={()=>setchk(true)}>View Notes</button>:<button onClick={()=>setchk(false)}>Close</button>}
          {chk&&<Pdfviewer pdfurl={i.filename}/>}
          <button>BUY NOW</button>
        </div>
      ))}
      <Footer url={url}/>
    </div>
  )
}

export default Notes
