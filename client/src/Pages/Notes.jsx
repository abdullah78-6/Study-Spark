import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { control } from '../Redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import Pdfviewer from './Pdfviewer'
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

                                        <span
                                            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
                                                ['approved', 'active'].includes(
                                                    String(i.status).toLowerCase()
                                                )
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-amber-100 text-amber-700'
                                            }`}
                                        >
                                            {i.status || 'Pending'}
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

                                    {/* PDF Toggle */}
                                    <button
                                        type="button"
                                        onClick={() => togglepdf(i._id)}
                                        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                                            openpdfid === i._id
                                                ? 'border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                : 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700'
                                        }`}
                                    >
                                        {openpdfid === i._id ? (
                                            <>
                                                <FaTimes />
                                                Close PDF Preview
                                            </>
                                        ) : (
                                            <>
                                                <FaEye />
                                                Preview Full Notes
                                            </>
                                        )}
                                    </button>

                
                                    {openpdfid === i._id && (
                                        <section className="mt-6 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
                                                <div className="flex min-w-0 items-center gap-2">
                                                    <FaFilePdf className="shrink-0 text-lg text-red-500" />

                                                    <div className="min-w-0">
                                                        <h3 className="text-sm font-bold text-slate-800">
                                                            PDF Document
                                                        </h3>
                                                        <p className="text-xs text-slate-500">
                                                            Scroll to read all available pages
                                                        </p>
                                                    </div>
                                                </div>

                                                
                                            </div>

                                            <div className="w-full min-w-0 overflow-x-auto p-2 sm:p-4">
                                                <div className="mx-auto w-full min-w-0 max-w-5xl overflow-hidden rounded-lg bg-white shadow-sm [&_canvas]:!h-auto [&_canvas]:!max-w-full [&_canvas]:!w-full [&_iframe]:!w-full [&_iframe]:!max-w-full [&_img]:!h-auto [&_img]:!max-w-full [&_img]:!w-full">
                                                    <Pdfviewer pdfurl={i.filename} />
                                                </div>
                                            </div>
                                        </section>
                                    )}


                                    <button
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
