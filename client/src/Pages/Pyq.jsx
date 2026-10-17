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
import {FaSearch,FaBookOpen,FaUserGraduate,FaUniversity,FaTag,FaEye,FaTimes,FaShoppingCart,FaFilePdf,FaGraduationCap,} from 'react-icons/fa';
import {toast} from "react-hot-toast"
const Pyq = ({url}) => {
const dispatch=useDispatch();
  const pyqclient=useSelector(state=>state.main.pyqclient);
  const searchpyq=useSelector(state=>state.main.searchpyq);
  const [chk,setchk]=useState(false);
  const [openpdfid,setopenpdfid]=useState(null);
  const [flow3,setflow3]=useState(false);
  const backendemail=useSelector(state=>state.main.backendemail);
  const debounced=useDebouncedCallback((value)=>{
  dispatch(control.setsearchpyq(value))
  },1000)
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
  const Searchapi=async()=>{
    try {
      const res=await axios.get(url+"/api/pyq/search",{
        withCredentials:true,
        params:{searchpyq}
      })
      if(res.data.status){
        dispatch(control.setpyqclient(res.data.result));
      }
      else{
        dispatch(control.setpyqclient([]));
      }
    } catch (error) {
      console.log("search api error",error);
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
useEffect(()=>{
  const status3=localStorage.getItem("status3")
  if(status3){
    setflow3(status3);
  }
},[])
const Downlaodpyq=(url,publicid)=>{
  if(!backendemail){
    toast.error("Student Login Required");
    return ;
  }
  if(!flow3){
    toast.error("Please purchase pyq");
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
const Enrolment = async (_id) => {
  if (!backendemail) {
    toast.error("Student Login Required");
    return;
  }

  if (!_id) {
    toast.error("Course ID is missing");
    return;
  }

  if (!window.Razorpay) {
    toast.error("Razorpay Checkout did not load");
    return;
  }

  try {
    // Create an order using the embedded course ID.
    const res = await axios.post(
      `${url}/api/pyq/pyq_payment`,
      { _id },
      { withCredentials: true }
    );

    if (!res.data.status) {
      toast.error(res.data.message || "Unable to create order");
      return;
    }

    const options = {
      key: res.data.key,
      amount: res.data.amount,
      currency: res.data.currency,
      name: "Study Spark",
      description: `Enrollment: ${pyqclient.subject}`,
      order_id: res.data.order_id,

      handler: async (response) => {
        try {
          const verifyRes = await axios.post(
            `${url}/api/pyq/pyq_chk`,
            {
              ...response,
              course_id: res.data.course_id,
            },
            { withCredentials: true }
          );

          if (verifyRes.data.status) {
            toast.success(
              verifyRes.data.message ||
              "Enrollment successful!"
            );
          } else {
            toast.error(
              verifyRes.data.message ||
              "Payment verification failed"
            );
            console.log(verifyRes.data.message)
          }
        } catch (error) {
          console.error(
            "Payment verification error:",
            error.response?.data || error.message
          );

          toast.error(
            error.response?.data?.message ||
            "Payment completed, but verification failed. Contact support before trying to pay again."
          );
          console.log(error.response);
          console.log("payment failed bug ");
        }
      },

      modal: {
        ondismiss: () => {
          toast("Payment window closed");
        },
      },

      theme: {
        color: "#1d4ed8",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", (response) => {
      console.error("Razorpay payment failed:", response.error);
      toast.error(
        response.error?.description || "Payment failed"
      );
    });

    razorpay.open();
  } catch (error) {
    console.error(
      "Enrollment payment error:",
      error.response?.data || error.message
    );

    toast.error(
      error.response?.data?.message ||
      "Unable to start payment"
    );
  }
};


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      <Navbar url={url}/>
        
      <main className="mx-auto min-h-[50vh] max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">


        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Explore Question Papers
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Find study material for your college and subjects.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {pyqclient.length} Papers
            </span>
          </div>

          <div className="relative mt-5">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              onChange={(e)=>debounced(e.target.value)}
              type="text"
              placeholder="Search by college..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-base"
            />
          </div>
        </div>

        {/* Empty State */}
        {pyqclient.length===0&&
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600">
              <FaSearch />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-800">
              No PYQ Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              No question papers are available for your search right now.
              Try searching with a different college name.
            </p>
          </div>
        }

        {/* Question Paper Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pyqclient.map((i,index)=>(
            <div
              key={i._id}
              className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60"
            >

              {/* Card Header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-5 sm:p-6">
                <div className="absolute -right-5 -top-8 h-28 w-28 rounded-full bg-white/10 transition duration-300 group-hover:scale-125"></div>

                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl text-white ring-1 ring-white/20">
                    <FaFilePdf />
                  </div>

                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                    Paper #{index+1}
                  </span>
                </div>

                <h2 className="relative mt-5 break-words text-xl font-bold text-white sm:text-2xl">
                  {i.subject}
                </h2>

                <p className="relative mt-2 flex items-start gap-2 break-words text-sm leading-6 text-blue-100">
                  <FaUniversity className="mt-1 shrink-0"/>
                  <span>{i.college_name}</span>
                </p>
              </div>

              {/* Card Details */}
              <div className="p-5 sm:p-6">
                <div className={`${chk?"hidden":"block"} space-y-4`}>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FaUserGraduate />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Teacher Name
                      </p>
                      <h3 className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {i.authorname}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <FaBookOpen />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Subject
                      </p>
                      <h3 className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {i.subject}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <FaTag />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Price
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-slate-900">
                        ₹{i.price}
                      </p>
                    </div>

                    <span className="max-w-28 break-words rounded-full bg-blue-50 px-3 py-1.5 text-center text-xs font-semibold text-blue-700">
                      {i.status}
                    </span>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center items-center flex-wrap  gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">

           {flow3&&<button
                    onClick={()=>togglepdf(i._id)}
                    className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      openpdfid===i._id
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {openpdfid===i._id
                      ? <><FaTimes/> Close PDF Preview</>
                      : <><FaEye/> Preview Full PYQ</>}
                  </button>}

                  <button
                  onClick={()=>Enrolment(i._id)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <FaShoppingCart />
                    BUY NOW
                  </button>
                  <button type="button"className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98]"onClick={()=>Downlaodpyq(i.filename,i.public_id)}
                  >
                    <IoMdDownload className='text-2xl'/><span>Download</span>
                  </button>

                </div>

                {/* PDF Preview */}
                
{/* PDF Preview */}

{/* PDF Preview */}
{openpdfid === i._id && (
  <section className="mt-6 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
    {/* Preview Header */}
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg text-red-500">
          <FaFilePdf />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-800 sm:text-base">
            PDF Document
          </h3>
          <p className="text-xs text-slate-500">
            Scroll to read all available pages
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => togglepdf(i._id)}
        className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <FaTimes />
        Close Preview
      </button>
    </div>

    {/* Same PDF Width as Notes.jsx */}
    <div className="w-full min-w-0 overflow-x-auto p-2 sm:p-4">
      <div className="mx-auto w-full min-w-0 max-w-5xl overflow-hidden rounded-lg bg-white shadow-sm [&_canvas]:!h-auto [&_canvas]:!max-w-full [&_canvas]:!w-full [&_iframe]:!w-full [&_iframe]:!max-w-full [&_img]:!h-auto [&_img]:!max-w-full [&_img]:!w-full">
        <Pdfviewer pdfurl={i.filename} />
      </div>
    </div>

  </section>
)}


              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer url={url}/>

    </div>
  )
}

export default Pyq
