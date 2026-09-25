import React from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from "react-redux"
import { FaBell } from "react-icons/fa";
import { control } from '../Redux/slice';
import {Link} from "react-router-dom"
const Teacher_Navbar = () => {
  const dispatch=useDispatch();
  const backendemail2=useSelector(state=>state.main.backendemail2)

  return (
    <div className='bg-gradient-to-r from-white via-sky-50 to-white shadow-md px-4 sm:px-8 py-3.5 sticky top-0 z-50 border-b border-sky-100 backdrop-blur-sm'>
      <div className='flex justify-between items-center'>

        <Link to="/teacher_page"
          onClick={()=>dispatch(control.setsidemenu(""))}
          className='text-xl sm:text-2xl font-extrabold text-slate-800 cursor-pointer select-none flex items-center gap-1 tracking-tight hover:opacity-80 transition-opacity'
        >
          <span className='w-2.5 h-2.5 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 shadow-sm shrink-0'></span>
          Study<span className='text-sky-500'>·</span>
          <span className='bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent'>Spark</span>
        </Link>

        <ul className='flex justify-end items-center gap-3 sm:gap-5'>

          <li className='relative cursor-pointer w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-sky-500 hover:bg-sky-50 transition-all duration-200'>
            <FaBell size={17} />
            <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white'></span>
          </li>

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