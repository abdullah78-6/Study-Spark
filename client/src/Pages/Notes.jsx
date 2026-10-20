import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { control } from '../Redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import Pdfviewer from './Pdfviewer'
import toast from 'react-hot-toast'
import { IoMdDownload } from "react-icons/io";
import {
    FaBookOpen,
    FaGraduationCap,
    FaUserTie,
    FaRupeeSign,
    FaFilePdf,
    FaEye,
    FaTimes,
    FaShoppingCart,
    FaBookReader
} from 'react-icons/fa'
const Notes = ({url}) => {
    const dispatch=useDispatch();
    const notesclient=useSelector(state=>state.main.notesclient);
    const [openpdfid,setopenpdfid]=useState(null);
    const backendemail=useSelector(state=>state.main.backendemail);
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
    const togglepdf=(id)=>{
        setopenpdfid(prev=>prev===id?null:id)
    }
    const Downloadnotes=(url,publicid)=>{
        
        if(!backendemail){
            toast.error("Student Login Required");
            return ;
        }
    const downloadurl=url.replace("/upload/","/upload/fl_attachment/")  
      const link=document.createElement("a");
      link.href=downloadurl;
      link.setAttribute("download",`${publicid||"study-notes"}.pdf`);
      link.filename="NOTES.pdf"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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
      `${url}/api/notes/notes_payment`,
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
      description: `Enrollment: ${notesclient.subject}`,
      order_id: res.data.order_id,

      handler: async (response) => {
        try {
          const verifyRes = await axios.post(
            `${url}/api/notes/chk_payment`,
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
            <Navbar url={url} />

            {/* Notes Heading - Hero Banner Removed */}
            <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                            Study resources
                        </p>

                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Explore your notes
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                            Access your study materials and preview PDF notes
                            in a comfortable reading space.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                            <FaFilePdf className="text-xl text-blue-600" />
                        </div>

                        <div>
                            <p className="text-lg font-bold text-slate-900">
                                {notesclient.length}
                            </p>
                            <p className="text-xs font-medium text-slate-500">
                                Study resources
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    
        <p className="mx-auto mb-5 max-w-2xl px-4 text-center text-xl capitalize leading-7 font-bold text-blue-600 sm:text-base ">
  Explore quality study notes on Study·Spark, your AI-powered learning
  platform. Access organized learning materials, important concepts,
  exam preparation resources, and revision notes to strengthen your
  understanding, prepare for semester examinations, and build the
                    technical skills you need for your future career.
                    </p>

                </div>
                {/* Empty State */}
                {notesclient.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-blue-200 bg-white px-5 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                            <FaBookOpen className="text-3xl text-blue-500" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-800">
                            No notes available yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            Your study materials will appear here once
                            they are available.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
                        
                        {notesclient.map((i, index) => (
                            <article
                                key={i._id}
                                className={`min-w-0 overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                                    openpdfid === i._id
                                        ? 'col-span-1 border-blue-200 shadow-lg shadow-blue-900/5 md:col-span-2 xl:col-span-3'
                                        : 'border-slate-200 shadow-sm hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg'
                                }`}
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
                                                    Note #{index + 1}
                                                </p>

                                                <h2 className="mt-1 break-words text-lg font-bold text-slate-900">
                                                    {i.subject || 'Study Material'}
                                                </h2>
                                            </div>
                                        </div>
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
                                                <p className="text-xs text-slate-400">
                                                    Uploaded by
                                                </p>
                                                <p className="break-words text-sm font-semibold text-slate-700">
                                                    {i.authorname || 'Teacher'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs text-slate-400">
                                                Price
                                            </p>

                                            <p className="mt-1 flex items-center justify-end gap-1 text-xl font-extrabold text-slate-900">
                                                <FaRupeeSign className="text-sm text-blue-600" />
                                                {i.price ?? 0}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                    onClick={()=>Enrolment(i._id)}
                                        type="button"
                                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                                    >
                                        <FaShoppingCart />
                                        BUY NOW
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

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            Open a note to read it in the expanded preview.
                            Your document's page layout is handled by the PDF viewer.
                        </p>
                    </div>
                </div>
            </main>

            <Footer url={url} />
        </div>
    )
}

export default Notes
