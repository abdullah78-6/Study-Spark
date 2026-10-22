import React, { useEffect, useState } from 'react'
import axios from "axios"
import { control } from '../../Redux/slice'
import {useDispatch,useSelector} from "react-redux"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners";
const Displaypyq =({url}) => {
const dispatch=useDispatch(); 
const[del,setdel]=useState(false); 
const pyq=useSelector(state=>state.main.pyq);
const fetchnotes=async()=>{
        try {
            const res=await axios.get(url+"/api/pyq/get_pyq",{
                withCredentials:true
            })
            if(res.data.status){
                dispatch(control.setpyq(res.data.result));
            }
            
        } catch (error) {
            console.log("get pyq error",error);
        }

    }
    useEffect(()=>{
        fetchnotes()
    },[]);
    const Delete=async(_id)=>{
        setdel(true);
    try {
  const res=await axios.delete(url+"/api/pyq/del_pyq",{
    data:{_id:_id},
    withCredentials:true
  });
  setdel(true)
  if(res.data.status){
    toast.success(res.data.message);
    setdel(false);
  } 
  else{

    toast.error(res.data.message);
    setdel(false);
  }   
  } catch (error) {
    console.log("delete pyq error",error);
    setdel(false);
    
  }

}
  return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">

            {/* Page Header */}
            <div className="mx-auto mb-8 max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Study Spark
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                            Previous Year Questions
                        </h1>
                        <p className="mt-2 text-sm text-slate-500 sm:text-base">
                            Manage and view your uploaded question papers.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-3 rounded-xl border border-blue-100 bg-white px-5 py-3 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">
                                {pyq.length}
                            </p>
                            <p className="text-xs font-medium text-slate-500">
                                Total PYQs
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Spinner */}
            {del && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-6 shadow-xl">
                        <ClipLoader color="#2563eb" size={40} />
                        <p className="text-sm font-medium text-slate-600">
                            Processing request...
                        </p>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {pyq.length === 0 ? (
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-20 text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 011.414 0l4 4A2 2 0 0118 8.414V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                        No PYQs available
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        There are no previous year question papers to display here yet.
                    </p>
                </div>
            ) : (
                /* PYQ Cards */
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {pyq.map((i, index) => {
                        return (
                            <div
                            key={index}
                                id={index}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                            >
                                {/* Card Header */}
                                <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-100">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                                Question Paper
                                            </p>
                                            <h2 className="mt-1 break-words text-lg font-bold text-slate-800">
                                                {i.subject}
                                            </h2>
                                        </div>
                                    </div>

                                    <span className="shrink-0 rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                        #{index + 1}
                                    </span>
                                </div>

                                {/* Card Details */}
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="space-y-4">

                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 text-slate-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={1.8}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-slate-400">
                                                    Teacher Name
                                                </p>
                                                <p className="mt-1 break-words text-sm font-semibold text-slate-700">
                                                    {i.authorname}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 text-slate-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={1.8}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
                                                    />
                                                    <circle cx="12" cy="10" r="2.5" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-slate-400">
                                                    College
                                                </p>
                                                <p className="mt-1 break-words text-sm font-semibold text-slate-700">
                                                    {i.college_name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm font-medium text-slate-500">
                                                Availability
                                            </span>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                                                    i.status === "free"
                                                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                                        : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                                                }`}
                                            >
                                                {i.status}
                                            </span>
                                        </div>

                                        {i.status === "free" ? "" : (
                                            <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3">
                                                <span className="text-sm font-medium text-slate-600">
                                                    Price
                                                </span>
                                                <span className="text-xl font-extrabold text-blue-700">
                                                    ₹{i.price}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* File Link */}
                                    <a
                                        href={i.filename}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.8}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 16V4m0 0L8 8m4-4l4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"
                                            />
                                        </svg>
                                        View Question Paper
                                    </a>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => Delete(i._id)}
                                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-100"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.8}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"
                                            />
                                        </svg>
                                        Delete PYQ
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Displaypyq
