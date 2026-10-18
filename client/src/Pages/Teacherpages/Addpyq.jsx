import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import { control } from '../../Redux/slice';
import {toast} from "react-hot-toast"
import axios from "axios"
import { ClipLoader } from "react-spinners";
const Addpyq = ({url}) => {
    const pyqdata=useSelector(state=>state.main.pyqdata);
    const pyqfile=useSelector(state=>state.main.pyqfile);
    const pyqloading=useSelector(state=>state.main.pyqloading);
    const backendemail2=useSelector(state=>state.main.backendemail2);    
    const disaptch=useDispatch();
    const Onchangehandler=(e)=>{
    disaptch(control.setpyqdata({
        name:e.target.name,
        value:e.target.value
    }))
}
const Addpyqs=async(e)=>{
    e.preventDefault();
    if(!pyqfile){
        toast.error("Plese select a pyq");
        return 
    }
    if(!backendemail2){
        toast.error("Teacher Login Required");
        return ;
    }
    disaptch(control.setpyqloading(true));
    const formdata=new FormData();
    formdata.append("authorname",pyqdata.authorname);
    formdata.append("pyq_file",pyqfile);
    formdata.append("subject",pyqdata.subject);
    formdata.append("collegename",pyqdata.collegename);
    formdata.append("status",pyqdata.status);
    formdata.append("price",pyqdata.price);
    try {
        const res=await axios.post(url+"/api/pyq/add_pyq",formdata,{
            
         withCredentials:true
            
            
        })
        if(res.data.status){
            disaptch(control.setpyqloading(false));
            toast.success(res.data.message);
        }
        else{
            disaptch(control.setpyqloading(false));
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log("add pyqs error",error);
        disaptch(control.setpyqloading(false));
        
    }

}

return (
  <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

    {/* Page Header */}
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-600/20">
        📚
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Upload Previous Year Papers
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
        Share previous year question papers with students to help them prepare
        for their examinations.
      </p>
    </div>

    {/* Form Card */}
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">

      {/* Loading Overlay */}
      {pyqloading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-lg">
            <ClipLoader color="#2563EB" size={42} />
            <p className="text-sm font-semibold text-blue-700">
              Uploading question paper...
            </p>
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-7 text-white sm:px-8 sm:py-8">
        <h2 className="text-xl font-bold sm:text-2xl">
          Question Paper Details
        </h2>
        <p className="mt-2 text-sm leading-6 text-blue-100">
          Enter the details and upload your question paper.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={Addpyqs}
        className="flex flex-col gap-6 px-5 py-7 sm:gap-7 sm:px-8 sm:py-9"
      >

        {/* Teacher Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Teacher name
          </label>

          <input
            onChange={Onchangehandler}
            value={pyqdata.authorname}
            name="authorname"
            id="name"
            type="text"
            placeholder="Enter teacher name"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:text-base"
          />
        </div>

        {/* File Upload */}
        {/* File Upload */}
<div>
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Upload question paper
  </label>

  <label
    htmlFor="pyq-file"
    className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 px-4 py-8 text-center transition-all hover:border-blue-500 hover:bg-blue-50 sm:py-10"
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-blue-100 transition group-hover:-translate-y-1">
      📁
    </div>

    <p className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
      Choose question paper
    </p>

    <p className="mt-2 text-xs text-slate-500 sm:text-sm">
      Click to select a PDF or image file
    </p>

    {/* Selected file name */}
    <span className="mt-4 max-w-full break-all rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700">
      {pyqfile?.name || "No file selected"}
    </span>
  </label>

  <input
    id="pyq-file"
    onChange={(e) =>
      disaptch(control.setpyqfile(e.target.files?.[0] || null))
    }
    type="file"
    accept="application/pdf,image/*"
    required
    className="sr-only"
  />
</div>
        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Subject
          </label>

          <input
            name="subject"
            onChange={Onchangehandler}
            value={pyqdata.subject}
            id="subject"
            type="text"
            placeholder="e.g. Computer Networks"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:text-base"
          />
        </div>

        {/* College Name */}
        <div>
          <label
            htmlFor="collegename"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            College name
          </label>

          <input
            name="collegename"
            onChange={Onchangehandler}
            value={pyqdata.collegename}
            id="collegename"
            type="text"
            placeholder="Enter college name"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:text-base"
          />
        </div>

        {/* Price and Status */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Price (₹)
            </label>

            <input
              name="price"
              onChange={Onchangehandler}
              value={pyqdata.price}
              id="price"
              type="number"
              placeholder="Enter amount"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:text-base"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Access type
            </label>

            <select
              onChange={Onchangehandler}
              value={pyqdata.status}
              name="status"
              id="status"
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:text-base"
            >
              <option value="paid">Paid</option>
              <option value="free">Free</option>
            </select>
          </div>

        </div>

        {/* Submit Button */}
        <div className="border-t border-slate-100 pt-6">
          <button
            type="submit"
            disabled={pyqloading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            <span>Add Question Paper</span>

            <span className="text-lg transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          <p className="mt-4 text-center text-xs text-slate-400">
            Study·Spark · Helping students prepare smarter
          </p>
        </div>

      </form>
    </div>
  </div>
)
}

export default Addpyq
