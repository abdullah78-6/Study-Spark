import React, { useEffect } from 'react'
import { control } from '../Redux/slice'
import {useSelector,useDispatch} from "react-redux"
import axios from "axios"
import {toast} from "react-hot-toast"
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase'
const Signup = ({url}) => {
const dispatch=useDispatch(); 
const Authdata=useSelector(state=>state.main.Logindata);
const backendemail=useSelector(state=>state.main.backendemail);
const backendemail2=useSelector(state=>state.main.backendemail2);
const type=useSelector(state=>state.main.type);
const Account=useSelector(state=>state.main.Account);
const setbackendemail2=useSelector(state=>state.main.setbackendemail2);
const Onchangehandler=(e)=>{
  dispatch(control.setLogindata({
        name:e.target.name,
        value:e.target.value
    }))
    }
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
  const Submit=async(e)=>{
      e.preventDefault();
      let newurl=url;
      if(type==="login"){
        newurl=newurl+"/api/auth/signin"
      }
      else{
        newurl=newurl+"/api/auth/signup"
      }
      try {
         const response=await axios.post(newurl,Authdata,{
            withCredentials:true
        });

    if(response.data.status){
       
          if(type==="login"){
          const res=await axios.get(url+"/api/auth/getprofile",{
            withCredentials:true,
        })
        if(res.data.status){
            dispatch(control.setbackendemail(res.data.email));
       }
        else{
            dispatch(control.setbackendemail(""));
        
        }
       
       
          }
        
       
        
        toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
      } catch (error) {
        console.log("backend server error while authentication ",error)
        
      }
   

    }
    const GoogleLogin=async(e)=>{
      e.preventDefault();
      const provider=new GoogleAuthProvider();
      const result=await signInWithPopup(auth,provider);
      try {
        const res=await axios.post(url+"/api/auth/googlelogin",
          {
            email:result.user.email,
            
          
          },
          
          {
            withCredentials:true
          }

        );
        if(res.data.status){
          toast.success(res.data.message);
          Fetch();
          dispatch(control.setbackendemail(res.data.email));
        }
        else{
        toast.error(res.data.message);
        }
        
      } catch (error) {
        console.log("goolge login server error",error);
        
      }
    }
    const Submit2=async(e)=>{
      e.preventDefault();
      let newurl=url;
      if(type==="login"){
        newurl=newurl+"/api/teach/Login"
      }
      else{
        newurl=newurl+"/api/teach/create"
      }
      try {
         const response=await axios.post(newurl,Authdata,{
            withCredentials:true
        });

    if(response.data.status){
       
          if(type==="login"){
          const res=await axios.get(url+"/api/teach/getteacher",{
            withCredentials:true,
        })
        if(res.data.status){
            dispatch(control.setbackendemail2(res.data.email));
       }
        else{
            dispatch(control.setbackendemail2(""));
        
        }
       
       
          }
        
       
        
        toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
      } catch (error) {
        console.log("backend server error while authentication ",error)
        
      }

    }
    const Googlelogin2=async(e)=>{
      e.preventDefault();
      const provider=new GoogleAuthProvider();
      const result=await signInWithPopup(auth,provider);
      try {
        const res=await axios.post(url+"/api/teach/Teach_GoogleLogin",
          {
            email:result.user.email,
            
          
          },
          
          {
            withCredentials:true
          }

        );
        if(res.data.status){
          toast.success(res.data.message);
          Fetch2();
          dispatch(control.setbackendemail2(res.data.email));
        }
        else{
        toast.error(res.data.message);
        }
        
      } catch (error) {
        console.log("goolge login server error",error);
        
      }

    }
 
return (
  <div className="relative min-h-screen w-full overflow-hidden bg-[#F7FAFF] px-4 py-8 sm:px-6 lg:px-8">
    <div className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-blue-400/15 blur-[120px]" />
    
    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[24rem] w-[24rem] rounded-full bg-cyan-400/10 blur-[110px]" />
    <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#1E40AF_1px,transparent_1px)] [background-size:20px_20px]" />

    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col items-center justify-center gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-16">

      <div className="hidden max-w-lg flex-1 flex-col justify-center lg:flex">
        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/20">
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
              fill="white"
            />
          </svg>
        </div>

        <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 xl:text-6xl">
          Study
          <span className="text-blue-600">·</span>
          Spark
        </h1>

        <p className="mt-5 max-w-md text-base leading-7 text-slate-500 xl:text-lg">
          Turn any subject into a focused study session — notes, questions,
          and answers, shaped around what you're learning.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            Smart Learning
          </div>

          <div className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            AI Powered
          </div>

          <div className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            Study Smarter
          </div>
        </div>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-blue-100/80 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(37,99,235,0.18)] sm:p-9 lg:flex lg:flex-col lg:justify-center">

        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
                fill="white"
              />
            </svg>
          </div>

          <span className="font-serif text-xl font-semibold text-slate-900">
            Study<span className="text-blue-600">·</span>Spark
          </span>
        </div>

        <div className="mb-8">
          <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
            {type === "Sign up" ? "Get Started" : "Welcome Back"}
          </div>

          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-[34px]">
            {type === "Sign up" ? "Create your account" : "Welcome back"}
          </h2>
           
          <p className="mt-2.5 text-[15px] leading-6 text-slate-500">
            {type === "Sign up"
              ? "Start turning your notes into smarter study sessions."
              : "Sign in to pick up where you left off."}
          </p>
        </div>

        <form onSubmit={Account==="teacher"?Submit2:Submit} className="flex flex-col gap-4">
          {type === "Sign up" && (
            <Field
              id="name"
              label="Full name"
              name="name"
              type="text"
              value={Authdata.name}
              onChange={Onchangehandler}
              placeholder="Ada Lovelace"
            />
          )}

          <Field
            id="email"
            label="Email address"
            name="email"
            type="email"
            value={Authdata.email}
            onChange={Onchangehandler}
            placeholder="you@school.edu"
          />

          <Field
            id="password"
            label="Password"
            name="password"
            type="password"
            value={Authdata.password}
            onChange={Onchangehandler}
            placeholder="At least 8 characters"
          />
          <div className='flex justify-center items-center font-serif flex-col'>
            {type==="Sign up"?<h1 className='text-blue-600 text-xl'>Account Type</h1>:<h1 className='text-blue-600 text-xl '>Login Type</h1>}
            <ul className='flex justify-center items-center gap-5 mt-3'>
              <li onClick={()=>dispatch(control.setAccount("student"))} className={` cursor-pointer ${Account==="student"?"bg-blue-600 text-white rounded-xl transition-all p-2":"text-blue-600 border p-2 rounded-2xl border-blue-200 transition-all"}`}>Student</li>
              <li onClick={()=>dispatch(control.setAccount("teacher"))} className={` cursor-pointer ${Account==="teacher"?"bg-blue-600 text-white rounded-xl transition-all p-2":"text-blue-600 border p-2 rounded-2xl border-blue-200 transition-all"}`}>Teacher</li>
            </ul>
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-blue-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:translate-y-0 active:bg-blue-800"
          >
            {type === "Sign up" ? "Create account" : "Sign in"}
          </button>

          {type === "login" && (
            <>
              <div className="my-2 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  or
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                onClick={Account==="teacher"?Googlelogin2:GoogleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[15px] font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:translate-y-0"
              >
                <FcGoogle className="text-lg" />
                Continue with Google
              </button>
            </>
          )}

          <p className="pt-4 text-center text-sm text-slate-500">
            {type === "Sign up" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => dispatch(control.settype("login"))}
                  className="font-semibold text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-700"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => dispatch(control.settype("Sign up"))}
                  className="font-semibold text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-700"
                >
                  Create one
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  </div>
);

function Field({ id, label, name, type, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        required
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[15px] text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
      />
      
    </div>
  );
}


}


  


export default Signup
