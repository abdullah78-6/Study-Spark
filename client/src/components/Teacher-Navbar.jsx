import React, { useState } from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from "react-redux"
import { FaBell } from "react-icons/fa";
import { control } from '../Redux/slice';
import {Link} from "react-router-dom"
import { MdSpaceDashboard, MdOutlineFeedback, MdLogout, MdLogin } from "react-icons/md"
import { FaBook, FaPlusCircle, FaQuestionCircle, FaStickyNote, FaFileAlt, FaRegFileAlt } from "react-icons/fa"
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
const Teacher_Navbar = ({url}) => {
  const dispatch=useDispatch();
  const backendemail2=useSelector(state=>state.main.backendemail2)
  const noti=useSelector(state=>state.main.noti)
  const navigate=useNavigate()
  const Logout=async(e)=>{
        e.preventDefault();
          const response=await axios.post(url+"/api/teach/Logout",{},{
            withCredentials:true
        });
        if(response.data.status){
            dispatch(control.setbackendemail2(""));
            navigate("/Login");
            
            
        toast.success(response.data.message);

        }
        else{
            toast.error(response.data.message);
        }

    }
  return (
    <div className='bg-gradient-to-r from-white via-sky-50 to-white shadow-md px-4 sm:px-8 py-3.5 sticky top-0 z-50 border-b border-sky-100 backdrop-blur-sm'>
      <div className='flex justify-between items-center flex-wrap'>

        <Link to="/teacher_page/dashboard"
          onClick={()=>dispatch(control.setsidemenu("one"))}
          className='text-xl sm:text-2xl font-extrabold text-slate-800 cursor-pointer select-none flex items-center gap-1 tracking-tight hover:opacity-80 transition-opacity'
        >
          <span className='w-2.5 h-2.5 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 shadow-sm shrink-0'></span>
          Study<span className='text-sky-500'>·</span>
          <span className='bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent'>Spark</span>
        </Link>
        <div className=' xl:hidden md:hidden flex flex-row p-2  flex-wrap items-center justify-center gap-5 rounded-xl border border-blue-100 bg-white  shadow-sm  '>
          <div>
          <Link className="rounded-lg   bg-blue-50/50 px-4 py-2 text-sm font-semibold text-slate-700  shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md " to="/teacher_page/dashboard">Dashboard</Link>
          </div>
          <div>
          <Link className="rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white" to="/teacher_page/Totalcourses">Courses</Link>
          </div>
          <div>
          <Link className='rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white' to="/teacher_page/addcourse">Add Courses</Link>
          </div>
          <div>
          <Link className='rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white' to="/teacher_page/totalquiz">Quizes</Link>
          </div>
          <div>
          <Link className='rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white' to="/teacher_page/addquiz">Add Quizes</Link>
          </div>
          <div>
          <Link className='rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white' to="/teacher_page/displaynotes">Notes</Link>
          </div>
          <div>
          <Link className='rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white' to="/teacher_page/addnotes">Add Notes</Link>
          </div>
          <div>
          <Link className='rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white' to="/teacher_page/displaypyq">PYQs</Link>
          </div>
          <div>
          <Link className='rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white' to="/teacher_page/addpyq">Add PYQs</Link>
          </div>
          <div>
          <Link className='rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white' to="/teacher_page/feedback">Feedbacks</Link>
          </div>
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

        <ul className='flex justify-end items-center gap-3 sm:gap-5 flex-wrap'>

          <Link to="/teacher_page/feedback" className='relative cursor-pointer w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-sky-500 hover:bg-sky-50 transition-all duration-200'>
            <FaBell onClick={()=>dispatch(control.setsidemenu("ten"))} size={17} />
            {noti&&<span className='absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white'></span>}
          </Link>

          <span className='h-7 w-px bg-sky-100 hidden sm:block'></span>

          <li className='flex items-center gap-2.5'>
            <div className='hidden sm:flex flex-col items-end leading-tight'>
              <span className='text-[10px] font-semibold text-sky-400 uppercase tracking-wider'>Teacher</span>
              <span className='text-xs font-medium text-slate-600 max-w-[140px] truncate'>
                {backendemail2 && backendemail2 }
              </span>
            </div>
            <div className='w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white font-bold uppercase shadow-sm shadow-sky-200 ring-2 ring-white cursor-pointer hover:scale-105 transition-transform' title="Profile">
              {backendemail2 ? backendemail2.slice(0,1) : ''}
            </div>
          </li>

        </ul>
      </div>
    </div>
  )
}

export default Teacher_Navbar