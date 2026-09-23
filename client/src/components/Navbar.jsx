import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import toast from "react-hot-toast"
import { control } from '../Redux/slice';
import {useNavigate} from "react-router-dom"
const Navbar = ({url}) => {
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const backendemail=useSelector(state=>state.main.backendemail);
    const navclass=useSelector(state=>state.main.navclass);
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
    const Logout=async(e)=>{
        e.preventDefault();
          const response=await axios.post(url+"/api/auth/logout",{},{
            withCredentials:true
        });
        if(response.data.status){
            dispatch(control.setbackendemail(""));
            
            
        toast.success(response.data.message);

        }
        else{
            toast.error(response.data.message);
        }

    }
return (
  <div className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

      <div className="shrink-0">
        <h1
          onClick={() => dispatch(control.setnavclass(""))}
          className="cursor-pointer text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
        >
          Study
          <span className="text-blue-600">·</span>
          <span className="text-blue-600">Spark</span>
        </h1>
      </div>

      <ul className="hidden items-center justify-center gap-1 md:flex">
        <li
          onClick={() => dispatch(control.setnavclass("home"))}
          className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            navclass === "home"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Home
        </li>

        <li
          onClick={() => dispatch(control.setnavclass("Courses"))}
          className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            navclass === "Courses"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Courses
        </li>

        <li
          onClick={() => dispatch(control.setnavclass("Learning"))}
          className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            navclass === "Learning"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          My Learning
        </li>

        <li
          onClick={() => dispatch(control.setnavclass("Contact"))}
          className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            navclass === "Contact"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Contact-us
        </li>
      </ul>

      <div className="flex items-center gap-3 sm:gap-5">
        <div>
          {backendemail ? (
            <button
              onClick={Logout}
              className="rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 sm:px-4"
              title="Logout"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
              title="Sign in"
            >
              Sign in
            </button>
          )}
        </div>

        {backendemail&&<div title="Profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 sm:h-10 sm:w-10 cursor-pointer">
          {backendemail.slice(0, 1)}
        </div>}
      </div>
    </div>

    <div className="mt-3 flex overflow-x-auto border-t border-blue-50 pt-2 md:hidden">
      <ul className="flex min-w-max gap-1">
        <li
          onClick={() => dispatch(control.setnavclass("home"))}
          className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
            navclass === "home"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Home
        </li>

        <li
          onClick={() => dispatch(control.setnavclass("Courses"))}
          className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
            navclass === "Courses"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Courses
        </li>

        <li
          onClick={() => dispatch(control.setnavclass("Learning"))}
          className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
            navclass === "Learning"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          My Learning
        </li>

        <li
          onClick={() => dispatch(control.setnavclass("Contact"))}
          className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
            navclass === "Contact"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Contact-us
        </li>
      </ul>
    </div>
  </div>
)


}

export default Navbar
