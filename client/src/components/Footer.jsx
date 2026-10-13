import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {FaGraduationCap,FaLinkedinIn,FaArrowUp,FaComments, FaTimes, FaPaperPlane,} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios"
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
const Footer = ({url}) => {
  const [bot,setbot]=useState(false);
  const Chatui=()=>{
  const [input,setinput]=useState("");
  const [msg,setmsg]=useState([])
  const [loading,setloading]=useState(false);
  const chatendref=useRef(null);
  const inputref=useRef(null);
  useEffect(()=>{
    chatendref.current?.scrollIntoView({
      behavior:"smooth",
      block:"end"
    })
  },[msg,loading])
  const Submitbot=async(e)=>{
    e.preventDefault()
    if(!input?.trim()){
      toast.error("Please Write Prompt");
      return ;
    }
setmsg((prev)=>[
  ...prev,
  {
    id:Date.now(),
    role:"user",
    content:input
  }
]);
setinput("")
setloading(true)
    try {
    const res=await axios.post(url+"/api/ai/send",{input:input.trim()},{
        
          withCredentials:true
        
      })
      if(res.data.status){
    setmsg((prev)=>[

      ...prev,
      {
        id:Date.now()+1,
        role:"bot",
        content:
        typeof res.data.result==="string"?res.data.result:res.data.result?.answer||res.data.result?.msg||JSON.stringify(res.data.result)
      },
    ]);
    setloading(false)
                
      }
      else{
        toast.error(res.data.message||"Unable to get an answer")
      }
    } catch (error) {
      console.log("bot error",error);
      toast.error(
    error.response?.data?.message || "Unable to connect to the AI server"
  );
    }

  }
    //   return ( <motion.div initial={{ opacity: 0, scale: 0.8, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 30 }} transition={{ duration: 0.25, ease: "easeOut", }} className="fixed bottom-24 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-blue-950/40 sm:right-7" >
         
    //      <div className="flex items-center justify-between bg-blue-600 px-4 py-4"> 
    //       <div className="flex items-center gap-3"> 
    //         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
    //          <FaGraduationCap className="text-lg" /> 
    //          </div> 
    //          <div>
    //            <h3 className="font-semibold text-white"> Study<span className="text-blue-200">·</span>Spark </h3>
    //             <p className="text-xs text-blue-100"> How can we help you? </p> 
    //             </div> 
    //             </div> 
    //             <motion.button whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setbot(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15" aria-label="Close chat" > 
    //               <FaTimes /> 
    //               </motion.button> 
    //               </div> 
                 
    //               <div className="flex h-72 flex-col bg-slate-900"> 
    //                 <div className="flex-1 overflow-y-auto p-4 flex-row"> 
    //                   <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3 text-sm text-slate-200 shadow-sm" >
    //                 {res.length!==0?res.data:<p> Hey 👋 <br /> 
    //                      How can I help you with Study·Spark ?</p>}   </motion.div> 
    //                     {usermsg}
    //                   </div>
                 
    //                     <form onSubmit={Submitbot}  className="border-t border-slate-800 bg-slate-950 p-3" > 
    //                       <div className="flex items-center gap-2"> 
    //                         <input type="text"onChange={(e)=>setinput(e.target.value)}  placeholder="Need help?" className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" /> 
    //                       <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500" aria-label="Send message" > <FaPaperPlane className="text-sm" />
    //                        </motion.button>
    //                         </div> 
    //                         </form> 
    //                         </div> 
    //                         </motion.div> 
    // );
    return (
      <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 30 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed bottom-24 right-5 z-50 flex w-[calc(100%-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-blue-950/40 sm:right-7"
        style={{ height: "min(480px, calc(100dvh - 120px))" }}
      >
          <div className="flex shrink-0 items-center justify-between bg-blue-600 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
              <FaGraduationCap className="text-lg" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Study<span className="text-blue-200">·</span>Spark
              </h3>
              <p className="text-xs text-blue-100">
                {loading ? "Thinking..." : "Your AI learning assistant"}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setbot(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15"
            aria-label="Close chat"
          >
            <FaTimes />
          </motion.button>
        </div>

        {/* Scrollable messages area */}
        <div
          className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain bg-slate-900 p-4"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Initial bot message */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-700 bg-slate-800 px-4 py-3 text-sm leading-6 text-slate-200 shadow-sm">
              Hey 👋
              <br />
              How can I help you with Study·Spark?
            </div>
          </motion.div>

          {/* User and bot messages */}
          {msg.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex w-full ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                  message.role === "user"
                    ? "rounded-tr-sm bg-blue-600 text-white"
                    : "rounded-tl-sm border border-slate-700 bg-slate-800 text-slate-200"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-700 bg-slate-800 px-4 py-4">
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
              </div>
            </motion.div>
          )}

          {/* Auto-scroll target */}
          <div ref={chatendref} />
        </div>

        {/* Message input */}
        <form
          onSubmit={Submitbot}
          className="shrink-0 border-t border-slate-800 bg-slate-950 p-3"
        >
          <div className="flex items-center gap-2">
            <input
              ref={inputref}
              type="text"
              value={input}
              onChange={(e) => setinput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60"
            />

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.9 }}
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <FaPaperPlane className="text-sm" />
            </motion.button>
          </div>
        </form>
      </motion.div>

      
    )
    }
   const navigate=useNavigate()
   const handlehome=()=>{
    if(window.location.pathname!=="/"){
      navigate("/")
    }
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
   }
  return (
    
<div>

  <AnimatePresence>
    {!bot&&(
      <motion.button
       initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.5 }} 
        whileHover={{ scale: 1.08 }}
         whileTap={{ scale: 0.9 }}
          onClick={() => setbot(true)}
           className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-950/50 transition hover:bg-blue-500 sm:right-7" 
           aria-label="Open chat" > 
           <FaComments className="text-xl" /> 
           
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-blue-300" />
             </motion.button>
    )}
  </AnimatePresence>
  <AnimatePresence>
  {bot&&<Chatui/>}  
  </AnimatePresence>
  
    <footer className="relative overflow-hidden border-t border-slate-700 bg-slate-950">
      
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/40 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-500">
              <FaGraduationCap className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Study<span className="text-blue-400">·</span>Spark
              </h2>

              <p className="text-xs font-medium text-slate-400">
                Learn. Practice. Grow.
              </p>
            </div>
          </Link>

          <div className="max-w-lg text-center md:text-left">
            <p className="text-sm leading-6 text-slate-400">
              Study·Spark is built to make learning simple, focused, and
              consistent. Learn new concepts, practice your skills, and
              continue improving every day.
            </p>
          </div>

          <Link
            to="https://www.linkedin.com/in/abdullah-qidwai-ba0656375/"

            target="blank"
            aria-label="Study·Spark LinkedIn"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-950/40"
          >
            <FaLinkedinIn />
          </Link>
        </div>

        <div className="my-8 h-px bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">

          <p className="text-center text-slate-500 sm:text-left">
            © {new Date().getFullYear()} Study·Spark. All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <Link
              
              className="text-slate-500 transition-colors hover:text-blue-400"
            >
              Privacy
            </Link>

            <Link
              
              className="text-slate-500 transition-colors hover:text-blue-400"
            >
              Terms
            </Link>

            <button
            type="button"
            onClick={handlehome}            
            aria-label="Back to home and top"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
              <FaArrowUp className="text-xs" />
            </button>

          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;

