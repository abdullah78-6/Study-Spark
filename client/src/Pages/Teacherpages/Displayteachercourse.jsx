import React, { useEffect } from 'react'
import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import { control } from '../../Redux/slice';
import {toast} from "react-hot-toast"
import { ClipLoader } from "react-spinners";
const Displayteachercourse = ({url}) => {
    const Totalteachercourses=useSelector(state=>state.main.Totalteachercourses);
    const dispatch=useDispatch();
    const displayloading=useSelector(state=>state.main.displayloading);
    const Fetchcourses=async()=>{
      try {
        const res=await axios.get(url+"/api/course/getcourse_teacher",{
          withCredentials:true
        });
        if(res.data.status){
          dispatch(control.setTotalteachercourses(res.data.result));
        }
      } catch (error) {
        console.log("error while fetching a courses ",error);
        
      }

    }
    useEffect(()=>{
      Fetchcourses();
    },[]);
    const DeleteCourse=async(id,fileid)=>{
      dispatch(control.setdisplayloading(true))
      try {
        dispatch(control.setdisplayloading(true))
        const res=await axios.delete(url+"/api/course/deletecourse",{
          data:{_id:id},
           withCredentials:true
        
        })
        dispatch(control.setdisplayloading(true))
        if(res.data.status){
          toast.success(res.data.message);
          dispatch(control.setdisplayloading(false))
        }
        else{
          toast.error(res.data.message);
          dispatch(control.setdisplayloading(false))
        }
      } catch (error) {
        console.log("delete course error ",error);
        dispatch(control.setdisplayloading(false))
        
      }
      
    
    }
    
   return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-10">

        {/* Page heading */}
        <div className="mx-auto mb-8 max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                Teacher Dashboard
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                My Courses
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                Manage your published courses and course modules.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20M8 7h8M8 10h6"/>
                </svg>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Total courses
                </p>
                <p className="text-2xl font-extrabold text-slate-900">
                  {Totalteachercourses.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course list */}
        <div className="mx-auto max-w-7xl">

          {/* Loading overlay */}
          {displayloading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-2xl">
                <ClipLoader color="#2563EB" size={42} />
                <p className="text-sm font-semibold text-slate-700">
                  Processing your request...
                </p>
              </div>
            </div>
          )}

          {Totalteachercourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

              {Totalteachercourses.map((i,index)=>{
                return (
                  <div
                    key={i._id || index}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
                  >

                    {/* Course thumbnail */}
                    <div className="relative overflow-hidden bg-slate-100">
                      <img
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-52"
                        src={i.image_address}
                        alt={i.name}
                      />

                      <div className="absolute left-3 top-3 rounded-lg border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-sm">
                        Course #{index+1}
                      </div>
                    </div>

                    {/* Course details */}
                    <div className="p-5 sm:p-6">

                      <h2 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-blue-700 sm:text-xl">
                        {i.name}
                      </h2>

                      <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 10h5"/>
                          </svg>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-slate-500">
                            Course modules
                          </p>
                          <p className="mt-0.5 text-lg font-bold text-slate-800">
                            {i.module}
                          </p>
                        </div>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={()=>DeleteCourse(i._id,i.Fileid)}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-100 active:scale-[0.98]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-5 w-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 6V4h6v2m-9 0 1 14h10l1-14M10 10v6m4-6v6"/>
                        </svg>
                        Delete Course
                      </button>

                    </div>
                  </div>
                )
              })}

            </div>
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white px-5 py-12 text-center sm:min-h-[400px]">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-10 w-10"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 10h6"/>
                </svg>
              </div>

              <h2 className="mt-6 text-xl font-bold text-slate-900 sm:text-2xl">
                No courses to display
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Your courses will appear here when they are available in your teacher dashboard.
              </p>

            </div>
          )}

        </div>
      </div>
    )
}

export default Displayteachercourse
