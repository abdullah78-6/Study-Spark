import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { control } from '../Redux/slice'
import axios from "axios"
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
const Course = ({url}) => {
  const dispatch=useDispatch();
  const studentcourse=useSelector(state=>state.main.studentcourse);
  const Fetchcourse=async()=>{
    try {
      const res=await axios.get(url+"/api/course/getcourse",{
        withCredentials:true
      });
      if(res.data.status){
        dispatch(control.setstudentcourse(res.data.result));
      }
    } catch (error) {
      console.log("error while getting a student course ");
      
    }
  }
  useEffect(()=>{
    Fetchcourse();
  },[])
  const navigate=useNavigate();
  const detailcourse=useSelector(state=>state.main.detailcourse);
  const Detailsredirect=(name,image,id,modules,description,urls,demo,outcome,feature,gst,price)=>{
    dispatch(control.setdetailcourse({
      name:name,
      image:image,
      id:id,
      modules:modules,
      description:description,
      urls:urls,
      demo:demo,
      outcome:outcome,
      feature:feature,
      gst:gst,
      price:price
    }))
    navigate("/course_details");

  }
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar url={url} />

      {/* Main Courses Section */}
      <main
        id="available-courses"
        className="mx-auto min-h-[500px] max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm">
          {/* <span className="text-slate-500">Home</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-blue-700">
            Courses
          </span> */}
        </div>

        {/* Professional Page Heading */}
        <div className="mb-10 border-b border-slate-200 pb-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-blue-600"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
              Study·Spark Learning
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Explore Our Courses
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Discover new skills, strengthen your knowledge,
                and find learning opportunities that support
                your academic and professional goals.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                📚
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Your Learning Journey
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Learn at your own pace
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Heading */}
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Available Courses
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Choose a course and take the next step in your learning journey.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Learn. Practice. Grow.
          </div>
        </div>

        {/* Course Cards */}
        {studentcourse.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              📚
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No Courses Available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Courses will appear here when they become available.
              Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studentcourse.map((i, index) => {
              return (
                <div
                  key={i.id || i._id || index}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                >
                  {/* Course Image */}
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 sm:h-56">
                    <img
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      src={i.image_address}
                      alt={i.name}
                    />

                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/40 to-transparent"></div>

                    <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                      Study·Spark
                    </div>
                  </div>

                  {/* Course Information */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="line-clamp-2 min-h-14 text-xl font-bold leading-7 text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
                      {i.name}
                    </h3>

                    {/* Module Details */}
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-700">
                        📖
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Course Content
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {i.module}{" "}
                          {Number(i.module) === 1 ? "Module" : "Modules"}
                        </p>
                      </div>
                    </div>

                    {/* Course Description */}
                    {i.description && (
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                        {i.description}
                      </p>
                    )}

                    {/* Course Price */}
                    {i.price !== undefined &&
                      i.price !== null &&
                      i.price !== "" && (
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                          <span className="text-sm text-slate-500">
                            Course Price
                          </span>

                          <span className="text-lg font-extrabold text-slate-900">
                            ₹{Number(i.price).toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}

                    {/* Course Details Button */}
                    <div className="mt-auto pt-6">
                      <button
                        onClick={() =>
                          Detailsredirect(
                            i.name,
                            i.image_address,
                            i._id,
                            i.module,
                            i.description,
                            i.urls,
                            i.demo,
                            i.outcome,
                            i.feature,
                            i.gst,
                            i.price
                          )
                        }
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                      >
                        View Course Details

                        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer url={url} />
    </div>
  ) 
}
export default Course
