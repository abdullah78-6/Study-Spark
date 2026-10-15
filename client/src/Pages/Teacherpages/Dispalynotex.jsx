import React, { useEffect, useState } from 'react'
import axios from "axios"
import { control } from '../../Redux/slice'
import {useDispatch,useSelector} from "react-redux"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners";
const Dispalynotex = ({url}) => {
    const dispatch=useDispatch(); 
    const Notes=useSelector(state=>state.main.Notes); 
    const[del,setdel]=useState(false);  
    const fetchnotes=async()=>{
        try {
            const res=await axios.get(url+"/api/notes/get_notes",{
                withCredentials:true
            })
            if(res.data.status){
                dispatch(control.setNotes(res.data.result));
            }
            
        } catch (error) {
            
        }

    }
    useEffect(()=>{
        fetchnotes()
    },[]);
    const Delete=async(_id)=>{
        setdel(true);
    try {
  const res=await axios.delete(url+"/api/notes/del_notes",{
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
    console.log("delete feedback error",error);
    setdel(false);
    
  }

    }
  return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">

            {/* Page Header */}
            <div className="mx-auto mb-8 max-w-7xl">
                <div className="flex flex-col justify-between gap-5 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">

                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-100">
                            📚
                        </div>

                        <div>
                            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-blue-600">
                                Study·Spark
                            </p>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                                Manage Notes
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Access and manage your study materials in one place.
                            </p>
                        </div>
                    </div>

                    <div className="flex w-fit items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-5 py-3">
                        <span className="text-2xl">📖</span>

                        <div>
                            <h2 className="text-2xl font-bold text-blue-700">
                                {Notes.length}
                            </h2>
                            <p className="text-xs font-medium text-slate-500">
                                Total Notes
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Delete Loader */}
            {del && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur-sm">
                    <ClipLoader color="#2563eb" size={45} />
                    <p className="text-sm font-semibold text-blue-700">
                        Processing request...
                    </p>
                </div>
            )}

            {/* Empty State */}
            {Notes.length === 0 ? (
                <div className="mx-auto flex min-h-72 max-w-7xl flex-col items-center justify-center rounded-2xl border border-dashed border-blue-200 bg-white px-6 py-12 text-center shadow-sm">

                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
                        📂
                    </div>

                    <h2 className="text-xl font-bold text-slate-800">
                        No notes available
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Your study materials will appear here once they are available.
                    </p>

                </div>
            ) : (

                /* Notes Grid */
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

                    {Notes.map((i, index) => {
                        return (
                            <div
                                id={index}
                                key={i._id || index}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60"
                            >

                                {/* Card Header */}
                                <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white p-5">

                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-2xl text-white shadow-md shadow-blue-100">
                                            📄
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-slate-400">
                                                NOTE #{index + 1}
                                            </p>

                                            <h2 className="mt-1 break-words text-lg font-bold text-slate-800">
                                                {i.subject}
                                            </h2>
                                        </div>
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                                            i.status === "free"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                    >
                                        {i.status}
                                    </span>

                                </div>

                                {/* Card Content */}
                                <div className="flex flex-1 flex-col p-5">

                                    {/* Author */}
                                    <div className="mb-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                                            👤
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-400">
                                                Author name
                                            </p>

                                            <h3 className="mt-1 break-words text-sm font-semibold text-slate-700">
                                                {i.authorname}
                                            </h3>
                                        </div>

                                    </div>

                                    {/* Subject */}
                                    <div className="mb-5">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Subject
                                        </p>

                                        <p className="break-words text-sm font-medium leading-6 text-slate-700">
                                            {i.subject}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    {i.status === "free" ? "" : (
                                        <div className="mb-5 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-4">

                                            <div>
                                                <p className="text-xs font-medium text-slate-500">
                                                    Note Price
                                                </p>

                                                <h3 className="mt-1 text-2xl font-bold text-blue-700">
                                                    ₹{i.price}
                                                </h3>
                                            </div>

                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl">
                                                💳
                                            </div>

                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-auto flex flex-col gap-3">

                                        <a
                                            href={i.filename}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                                        >
                                            <span>↗</span>
                                            Open Notes File
                                        </a>

                                        <button
                                            onClick={() => Delete(i._id)}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition duration-200 hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
                                        >
                                            <span>🗑️</span>
                                            Delete Note
                                        </button>

                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </div>
            )}

        </div>
    )
    }

export default Dispalynotex
