import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { control } from '../Redux/slice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaBookOpen, FaArrowRight, FaClipboardCheck, FaRegLightbulb } from 'react-icons/fa';
const Quiz = ({url}) => {
const dispatch=useDispatch();
const quizmaindata=useSelector(state=>state.main.quizmaindata);
const quizid=useSelector(state=>state.main.quizid);
const quizdetails=useSelector(state=>state.main.quizdetails);
const navigate=useNavigate();
const Fetchquiz=async()=>{
    try {
        const res=await axios.get(url+"/api/quiz/getstudentquiz",{
            withCredentials:true
        });
        if(res.data.status){
            dispatch(control.setquizmaindata(res.data.result));
            
            
        }
        
    } catch (error) {
        console.log("fetch quiz error ",error);
        
    }

}
useEffect(()=>{
    Fetchquiz();

},[]);
const Navigationupdate=(id,questions)=>{
    dispatch(control.setquizid(id));
    dispatch(control.setquizdetails(questions));
    navigate("/quiz_details")

}
   return (
        <div className="min-h-screen bg-slate-50">
            <Navbar url={url} />
            
            <main
                id="available-quizzes"
                className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20"
            >
                <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                            Practice Zone
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            Available Mock Quizzes
                        </h2>
                        <p className="mt-3 max-w-2xl text-slate-600">
                            Select a Quiz and start practicing to improve your
                            understanding.
                        </p>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
                        <FaBookOpen className="text-blue-600" />
                        <span className="font-semibold text-slate-700">
                            {quizmaindata.length} {quizmaindata.length === 1 ? 'Quiz' : 'Quizzes'} Available
                        </span>
                    </div>
                </div>

                {quizmaindata.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-blue-200 bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
                            <FaBookOpen className="text-3xl text-blue-500" />
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-slate-800">
                            No Quizzes Available
                        </h3>
                        <p className="mx-auto mt-2 max-w-md leading-6 text-slate-500">
                            There are no quizzes available right now. Please check
                            again later for new practice material.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {quizmaindata.map((i, index) => (
                            <article
                                key={i._id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                            >
                                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
                                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-200/40 transition duration-300 group-hover:scale-125"></div>
                                    <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-indigo-200/40"></div>

                                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white bg-white/90 text-blue-600 shadow-md transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                                        <FaClipboardCheck className="text-4xl" />
                                    </div>

                                    <span className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                                        QUIZ {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                                        <FaBookOpen className="text-blue-500" />
                                        <span>Mock Practice</span>
                                    </div>

                                    <h3 className="line-clamp-2 min-h-14 text-xl font-bold text-slate-900 transition group-hover:text-blue-700">
                                        {i.subject}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        Test your understanding of this topic and
                                        practice your concepts.
                                    </p>

                                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                        <span className="text-sm font-medium text-slate-500">
                                            {Array.isArray(i.questions)
                                                ? `${i.questions.length} Questions`
                                                : 'Practice Quiz'}
                                        </span>

                                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                                            Available
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => Navigationupdate(i._id, i.questions)}
                                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                                    >
                                        Attempt Quiz
                                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            {/* Bottom CTA */}
            <section className="px-5 pb-14 sm:px-8">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-10 text-center sm:px-12 sm:py-12">
                    <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                        Every Question Makes You Better
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-blue-100">
                        Keep practicing, learn from your mistakes, and make
                        progress toward your learning goals with Study·Spark.
                    </p>
                </div>
            </section>

            <Footer url={url} />
        </div>
    );
}

export default Quiz
