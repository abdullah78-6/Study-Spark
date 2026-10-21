import React, { useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { IoMdDownload } from "react-icons/io";
import { control } from '../Redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Pdfviewer from './Pdfviewer'
import { useDebounce } from 'use-debounce';
import { useDebouncedCallback } from 'use-debounce';
import {FaSearch,FaBookOpen,FaUserGraduate,FaUniversity,FaTag,FaEye,FaTimes,FaShoppingCart,FaFilePdf,FaGraduationCap,  FaUserTie,FaRupeeSign,} from 'react-icons/fa';
import {toast} from "react-hot-toast"
const Pyq_purchase = ({url}) => {
const dispatch=useDispatch();
  const pyqclient=useSelector(state=>state.main.purchasepyq);
  const searchpyq=useSelector(state=>state.main.searchpyq);
  const [chk,setchk]=useState(false);
  const [openpdfid,setopenpdfid]=useState(null);
  const backendemail=useSelector(state=>state.main.backendemail);
  const[openpdfkey,setopenpdfkey]=useState(null)
  const debounced=useDebouncedCallback((value)=>{
  dispatch(control.setsearchpyq(value))
  },1000)
  const Fetchpyq=async()=>{
    try {
      const res=await axios.get(url+"/api/pyq/get_purchase_pyq",{
        withCredentials:true
      });
      if(res.data.status){
        dispatch(control.setpurchasepyq(res.data.result));
      }
    } catch (error) {
      console.log("fetch pyq client error",error);
    }
  }
  const togglepdf=(id)=>{
        setopenpdfid(prev=>prev===id?null:id)
    }

  useEffect(()=>{
  if(searchpyq.trim()===""){
    Fetchpyq();
  }
  else{
  Searchapi();
}
},[searchpyq])
const Downlaodpyq=(url,publicid)=>{
  if(!backendemail){
    toast.error("Student Login Required");
    return ;
  }
 
        const finalurl=url.replace("/upload/","/upload/fl_attachment/")
        const link=document.createElement("a")
        link.href=finalurl;
        link.setAttribute("download",`${publicid||"pyq"}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
}
const pyqwithkey=pyqclient.map((pyq,index)=>({
  pyq,
  index,
  key:`${pyq._id??pyq.public_id??"pyq"}-${index}`,
}))
const openItem=pyqwithkey.find((n)=>n.key===openpdfkey)||null
const openpreview=(key)=>{
  setopenpdfkey(key)
  window.scrollTo({top:0,behavior:"smooth"})
}
const closepreview=()=>setopenpdfkey(null)
useEffect(()=>{
  if(!openpdfkey){
    return 
  }
  const onkey=(e)=>e.key==="Escape"&&setopenpdfkey(null);
  window.addEventListener("keydown",onkey);
},[openpdfkey])
return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar url={url} />

      <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* ================= FOCUS MODE: only the selected PDF ================= */}
        {openItem ? (
          <div className="mx-auto w-full max-w-5xl">
            {/* Close button lives here, so it always shows */}
            <div className="sticky top-0 z-30 mb-3 flex justify-end">
              <button
                type="button"
                onClick={closepreview}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
              >
                <FaTimes />
                Close Preview
              </button>
            </div>

            <Pdfviewer key={openItem.key} pdfurl={openItem.pyq.filename} />
          </div>
        ) : (
          <>
            {/* ================= LIST MODE ================= */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Study resources
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Explore your PYQs
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Access your PYQs and preview PDF  
                </p>
                <p className="mt-3 max-w-2xl text-xl font-bold leading-7 text-blue-600">
                  Access your purchased papers anytime to strengthen your exam preparation,
                  understand question patterns, revise important topics, and practice with
                  confidence. Preview your question papers online or download them for offline
                  study. Make the most of these resources to improve your problem-solving
                  skills, identify important concepts, and prepare effectively for your upcoming
                  examinations.
                </p>
              </div>

              <div className="flex w-fit items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <FaFilePdf className="text-xl text-blue-600" />
                </div>

                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {pyqclient.length}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    Study resources
                  </p>
                </div>
              </div>
            </div>

            {pyqclient.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-blue-200 bg-white px-5 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <FaBookOpen className="text-3xl text-blue-500" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-800">
                 No PYQ Found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  No question papers are available  right now.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
                {pyqwithkey.map(({ pyq: i, index, key }) => (
                  <article
                    key={key}
                    className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >
                    {/* Note Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                            <FaFilePdf className="text-xl" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                              PYQ #{index + 1}
                            </p>

                            <h2 className="mt-1 break-words text-lg font-bold text-slate-900">
                              {i.subject || "Study Material"}
                            </h2>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
                            ["approved", "active"].includes(
                              String(i.status).toLowerCase()
                            )
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {i.status || "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Note Details */}
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <FaUserTie />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs text-slate-400">Uploaded by</p>
                            <p className="break-words text-sm font-semibold text-slate-700">
                              {i.authorname || "Teacher"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-400">Price</p>

                          <p className="mt-1 flex items-center justify-end gap-1 text-xl font-extrabold text-slate-900">
                            <FaRupeeSign className="text-sm text-blue-600" />
                            {i.price ?? 0}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openpreview(key)}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        <FaEye />
                        Preview Full PYQs
                      </button>

                      <button
                        type="button"
                        onClick={() => Downlaodpyq(i.filename, i.public_id)}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        <IoMdDownload className="text-xl" />
                        <span>Download</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Footer Information */}
            <div className="mt-10 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
              <FaBookOpen className="mt-1 shrink-0 text-lg text-blue-600" />

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Your learning, your pace
                </p>
                </div>
            </div>
          </>
        )}
      </main>

      <Footer url={url} />
    </div>
  );
}


export default Pyq_purchase
