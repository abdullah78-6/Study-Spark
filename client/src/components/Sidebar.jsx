import React, { useEffect } from 'react'
import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import toast from "react-hot-toast"
import { control } from '../Redux/slice'
import {useNavigate} from "react-router-dom"
import { MdSpaceDashboard, MdOutlineFeedback, MdLogout, MdLogin } from "react-icons/md"
import { FaBook, FaPlusCircle, FaQuestionCircle, FaStickyNote, FaFileAlt, FaRegFileAlt } from "react-icons/fa"
import {Link} from "react-router-dom"
const Sidebar = ({url}) => {
    const dispatch=useDispatch();
    const backendemail2=useSelector(state=>state.main.backendemail2);
    const navigate=useNavigate()
    const sidemenu=useSelector(state=>state.main.sidemenu);
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
    <div className='w-full sm:w-64 md:w-72 sm:h-[calc(100vh-64px)] sm:sticky sm:top-16 bg-gradient-to-b from-sky-50 via-white to-white border-r border-sky-100 shadow-sm flex flex-col overflow-hidden'>
      <div className='flex flex-col h-full justify-between overflow-hidden'>

        {/* profile chip */}
        <div className='px-4 pt-4 pb-3 flex items-center gap-3 border-b border-sky-100'>
          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 via-cyan-400 to-sky-500 flex items-center justify-center text-white font-bold uppercase shadow-md shadow-sky-200 shrink-0 ring-2 ring-white' title="Profile">
            {backendemail2 ? backendemail2.slice(0,1) : "?"}
          </div>
          <div className='min-w-0'>
            <p className='text-[10px] font-bold tracking-wider text-sky-400 uppercase'>Teacher Panel</p>
            <p className='text-xs font-medium text-slate-600 truncate'>
              {backendemail2 ? backendemail2 : "Not logged in"}
            </p>
          </div>
        </div>

        <ul className='w-full flex-1 flex flex-col justify-start items-stretch gap-1 p-2.5 sm:p-3 overflow-hidden '>

          <li
            onClick={()=>dispatch(control.setsidemenu("one"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="one"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="one" ? "opacity-100" : "opacity-0"}`}></span>
            <MdSpaceDashboard size={16} className={sidemenu==="one" ? "text-white" : "text-sky-400"} />
            Dashboard
          </li>

          <li
            onClick={()=>dispatch(control.setsidemenu("two"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="two"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="two" ? "opacity-100" : "opacity-0"}`}></span>
            <FaBook size={14} className={sidemenu==="two" ? "text-white" : "text-sky-400"} />
            Courses
          </li>

          <Link to="/teacher_page/addcourse"
            onClick={()=>dispatch(control.setsidemenu("three"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="three"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="three" ? "opacity-100" : "opacity-0"}`}></span>
            <FaPlusCircle size={13} className={sidemenu==="three" ? "text-white" : "text-sky-400"} />
            Add Courses
          </Link>

          <li
            onClick={()=>dispatch(control.setsidemenu("four"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="four"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="four" ? "opacity-100" : "opacity-0"}`}></span>
            <FaQuestionCircle size={14} className={sidemenu==="four" ? "text-white" : "text-sky-400"} />
            Quizes
          </li>

          <li
            onClick={()=>dispatch(control.setsidemenu("five"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="five"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="five" ? "opacity-100" : "opacity-0"}`}></span>
            <FaPlusCircle size={13} className={sidemenu==="five" ? "text-white" : "text-sky-400"} />
            Add Quizes
          </li>

          <li
            onClick={()=>dispatch(control.setsidemenu("six"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="six"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="six" ? "opacity-100" : "opacity-0"}`}></span>
            <FaStickyNote size={13} className={sidemenu==="six" ? "text-white" : "text-sky-400"} />
            Notes
          </li>

          <li
            onClick={()=>dispatch(control.setsidemenu("seven"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="seven"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="seven" ? "opacity-100" : "opacity-0"}`}></span>
            <FaPlusCircle size={13} className={sidemenu==="seven" ? "text-white" : "text-sky-400"} />
            Add Notes
          </li>

          <li
            onClick={()=>dispatch(control.setsidemenu("eight"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="eight"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="eight" ? "opacity-100" : "opacity-0"}`}></span>
            <FaFileAlt size={13} className={sidemenu==="eight" ? "text-white" : "text-sky-400"} />
            PYQs
          </li>

          <li
            onClick={()=>dispatch(control.setsidemenu("nine"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="nine"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="nine" ? "opacity-100" : "opacity-0"}`}></span>
            <FaPlusCircle size={13} className={sidemenu==="nine" ? "text-white" : "text-sky-400"} />
            Add PYQs
          </li>

          <li
            onClick={()=>dispatch(control.setsidemenu("ten"))}
            className={`group relative flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200
              ${sidemenu==="ten"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:pl-4"}`}
          >
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-white transition-opacity ${sidemenu==="ten" ? "opacity-100" : "opacity-0"}`}></span>
            <MdOutlineFeedback size={16} className={sidemenu==="ten" ? "text-white" : "text-sky-400"} />
            Feedbacks
          </li>

        </ul>

        <div className='w-full p-3 border-t border-sky-100 bg-gradient-to-r from-sky-50 to-white'>
          {backendemail2 ? (
            <button
              onClick={Logout}
              className='w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-50 text-rose-600 font-semibold text-sm hover:bg-rose-100 hover:shadow-sm transition-all duration-200 border border-rose-100'
              title="Logout"
            >
              <MdLogout size={15} />
              Logout
            </button>
          ) : (
            <button
              onClick={()=>navigate("/login")}
              className='w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 hover:shadow-lg transition-all duration-200 shadow-md shadow-sky-200'
              title="Login"
            >
              <MdLogin size={15} />
              Login
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default Sidebar