import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import { control } from '../../Redux/slice';
import {toast} from "react-hot-toast"
import axios from "axios"
import { ClipLoader } from "react-spinners";
const Addnotes = ({url}) => {
const disaptch=useDispatch();
const backendemail2=useSelector(state=>state.main.backendemail2);    
const Notesdata=useSelector(state=>state.main.Notesdata);
const notesfile=useSelector(state=>state.main.notesfile);
const notesloading=useSelector(state=>state.main.notesloading);
const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:text-base";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";
const Onchangehandler=(e)=>{
    disaptch(control.setNotesdata({
        name:e.target.name,
        value:e.target.value
    }))
}
const Addnotes=async(e)=>{
    e.preventDefault();
    if(!notesfile){
        toast.error("Plese select a notes");
        return 
    }
    if(!backendemail2){
        toast.error("Teacher Login Required");
        return ;
    }
    disaptch(control.setnotesloading(true));
    const formdata=new FormData();
    formdata.append("authorname",Notesdata.authorname);
    formdata.append("notes_file",notesfile);
    formdata.append("subject",Notesdata.subject);
    formdata.append("status",Notesdata.status);
    formdata.append("price",Notesdata.price);
    try {
        const res=await axios.post(url+"/api/notes/add_notes",formdata,{
            
         withCredentials:true
            
            
        })
        if(res.data.status){
            disaptch(control.setnotesloading(false));
            toast.success(res.data.message);
        }
        else{
            disaptch(control.setnotesloading(false));
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log("add notes error",error);
        disaptch(control.setnotesloading(false));
        
    }

}
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Page heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-600/20">
                📄
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Upload Study Notes
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Share your study materials with students. Add the details,
                upload your notes, and make learning easier.
            </p>
        </div>

        {/* Main form card */}
        <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/60">

            {/* Loading overlay */}
            {notesloading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-xl">
                        <ClipLoader color="#2563EB" size={44} />
                        <p className="text-sm font-semibold text-blue-700">
                            Uploading your notes...
                        </p>
                    </div>
                </div>
            )}

            {/* Card header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-7 text-white sm:px-8 sm:py-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-2xl">
                        ✨
                    </div>

                    <div>
                        <h2 className="text-xl font-bold sm:text-2xl">
                            Notes Information
                        </h2>
                        <p className="mt-1 text-sm text-blue-100">
                            Complete the details below to add your notes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={Addnotes} className="flex flex-col gap-6 px-5 py-7 sm:gap-7 sm:px-8 sm:py-9">

                {/* Author name */}
                <div>
                    <label htmlFor="name" className={labelClass}>
                        Author name
                    </label>

                    <input
                        onChange={Onchangehandler}
                        value={Notesdata.authorname}
                        name="authorname"
                        id="name"
                        type="text"
                        placeholder="Enter author name"
                        required
                        className={inputClass}
                    />
                </div>

                {/* Notes file upload */}
                <div>
                    <label className={labelClass}>
                        Upload notes file
                    </label>

                    <label
                        htmlFor="notes-pdf"
                        className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 px-4 py-8 text-center transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 sm:py-10"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-blue-100 transition group-hover:-translate-y-1 group-hover:shadow-md">
                            📁
                        </div>

                        <p className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
                            {notesfile ? notesfile.name : "Choose your notes file"}
                        </p>

                        <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                            Click to browse and select your study material
                        </p>

                        <span className="mt-4 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                            PDF or supported image
                        </span>
                    </label>

                    <input
                        onChange={(e)=>disaptch(control.setnotesfile(e.target.files[0]))}
                        type="file"
                        id="notes-pdf"
                        accept="application/pdf,image/"
                        required
                        className="sr-only"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                        Select the file you want to share with students.
                    </p>
                </div>

                {/* Subject */}
                <div>
                    <label htmlFor="subject" className={labelClass}>
                        Notes subject
                    </label>

                    <input
                        name="subject"
                        onChange={Onchangehandler}
                        value={Notesdata.subject}
                        id="subject"
                        type="text"
                        placeholder="e.g. Data Structures and Algorithms"
                        required
                        className={inputClass}
                    />
                </div>

                {/* Price and access type */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                    <div>
                        <label htmlFor="price" className={labelClass}>
                            Notes price (₹)
                        </label>

                        <input
                            name="price"
                            onChange={Onchangehandler}
                            value={Notesdata.price}
                            id="price"
                            type="number"
                            placeholder="Enter amount"
                            className={inputClass}
                        />

                        <p className="mt-2 text-xs text-slate-400">
                            Enter the price for your notes.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="status" className={labelClass}>
                            Access type
                        </label>

                        <select
                            onChange={Onchangehandler}
                            value={Notesdata.status}
                            name="status"
                            id="status"
                            className={`${inputClass} cursor-pointer`}
                        >
                            <option>Select type</option>
                            <option value="paid">Paid</option>
                            <option value="free">Free</option>
                        </select>

                        <p className="mt-2 text-xs text-slate-400">
                            Choose free or paid access.
                        </p>
                    </div>

                </div>

                {/* Submit button */}
                <div className="border-t border-slate-100 pt-6">
                    <button
                        type="submit"
                        disabled={notesloading}
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:text-base"
                    >
                        <span>Upload Notes</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7"/>
                        </svg>
                    </button>

                    <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                        Help students learn with your study materials.
                    </p>
                </div>

            </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
            Study·Spark · Empowering learners through education
        </p>
    </div>
)
}

export default Addnotes
