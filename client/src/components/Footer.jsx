import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaGraduationCap,FaLinkedinIn,FaArrowUp,FaComments, FaTimes, FaPaperPlane,} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
const Footer = () => {
  const [bot,setbot]=useState(false);
  const Chatui=()=>{
      return ( <motion.div initial={{ opacity: 0, scale: 0.8, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 30 }} transition={{ duration: 0.25, ease: "easeOut", }} className="fixed bottom-24 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-blue-950/40 sm:right-7" >
         
         <div className="flex items-center justify-between bg-blue-600 px-4 py-4"> 
          <div className="flex items-center gap-3"> 
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
             <FaGraduationCap className="text-lg" /> 
             </div> 
             <div>
               <h3 className="font-semibold text-white"> Study<span className="text-blue-200">·</span>Spark </h3>
                <p className="text-xs text-blue-100"> How can we help you? </p> 
                </div> 
                </div> 
                <motion.button whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setbot(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15" aria-label="Close chat" > 
                  <FaTimes /> 
                  </motion.button> 
                  </div> 
                 
                  <div className="flex h-72 flex-col bg-slate-900"> 
                    <div className="flex-1 overflow-y-auto p-4"> 
                      <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3 text-sm text-slate-200 shadow-sm" > Hey 👋 <br /> How can I help you with Study·Spark? </motion.div> 
                      </div>
                 
                        <form onSubmit={(e) => e.preventDefault()} className="border-t border-slate-800 bg-slate-950 p-3" > 
                          <div className="flex items-center gap-2"> <input type="text" placeholder="Need help?" className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" /> 
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500" aria-label="Send message" > <FaPaperPlane className="text-sm" />
                           </motion.button>
                            </div> 
                            </form> 
                            </div> 
                            </motion.div> 
    );
    }
  return (
<div>
  {!bot&&<button onClick={()=>setbot(true)}>Chat message symbol</button>}
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
            to="/linkedin"
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
              to="/privacy"
              className="text-slate-500 transition-colors hover:text-blue-400"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-slate-500 transition-colors hover:text-blue-400"
            >
              Terms
            </Link>

            <Link
              to="/"
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
              <FaArrowUp className="text-xs" />
            </Link>

          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;

