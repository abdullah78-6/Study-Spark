import React, { useEffect } from 'react'
import { control } from '../Redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import {MediaController,MediaControlBar,MediaTimeRange,MediaTimeDisplay,MediaVolumeRange,MediaPlaybackRateButton,MediaPlayButton,MediaSeekBackwardButton,MediaSeekForwardButton,MediaMuteButton,MediaFullscreenButton,} from "media-chrome/react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import axios from 'axios'
import toast from 'react-hot-toast'
const Couresedetail = ({url}) => {
    const detailcourse=useSelector(state=>state.main.detailcourse);
    const navigate=useNavigate();
    useEffect(()=>{
    if(!detailcourse.id){
            navigate("/course")
        }
    },[])
    const Enrolment=async(_id)=>{
      toast.error("Payment gateway api key required");
      try {
      const res=await axios.post(url+"/api/course/payment",{_id},{
        withCredentials:true
    })
    if(res.data.status){
      toast.success(res.data.message);
    }
        
      } catch (error) {
        console.log("enrollemnt error payment first step",error);
        
      }

    }
   return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar url={url} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Course Hero */}
        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="mb-4 w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Study·Spark | Online Learning
              </span>

              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                {detailcourse.name}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {detailcourse.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  {detailcourse.modules} Modules
                </span>
</div>

              <div className="mt-8">
                <p className="text-sm font-medium text-slate-500">
                  Total course fee
                </p>

                <div className="mt-1 flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl font-bold text-blue-700">
                    ₹{Number(detailcourse.gst) + Number(detailcourse.price)}
                  </span>

                  <span className="text-sm text-slate-500">
                    Including tuition fee
                  </span>
                </div>

                <button
                  onClick={() => Enrolment(detailcourse.id)}
                  className="mt-6 w-full rounded-xl bg-blue-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-fit"
                >
                  ENROLL NOW
                </button>
              </div>
            </div>

            <div className="relative min-h-64 bg-slate-100 lg:min-h-full">
              <img
                src={detailcourse.image}
                alt={detailcourse.name}
                className="h-full min-h-64 w-full object-cover lg:absolute lg:inset-0"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-sm font-medium text-blue-100">
                  YOUR LEARNING JOURNEY STARTS HERE
                </p>
                <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  Learn. Practice. Grow.
                </h2>
              </div>
            </div>

          </div>
        </section>

        {/* Course Information */}
        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  About This Course
                </h2>
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                {detailcourse.description}
              </p>
            </div>

            {/* Learning Outcomes */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12 2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 3a11.955 11.955 0 0 1-8.618 2.984A12.003 12.003 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9c0-1.042-.133-2.053-.382-3.016Z"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  What You'll Learn
                </h2>
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                {detailcourse.outcome}
              </p>
            </div>

            {/* Course Features */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 2.25 1.5 6h6l-4.5 4.5 1.5 6-6-3.75-6 3.75 1.5-6-4.5-4.5h6l1.5-6Z"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Course Features
                </h2>
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                {detailcourse.feature}
              </p>
            </div>

          </div>

          {/* Fee Details */}
          <aside className="h-fit rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-slate-900">
              Course Fee Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              A breakdown of your course fees
            </p>

            <div className="my-6 border-t border-slate-100" />

            <div className="flex items-center justify-between gap-3 py-3">
              <span className="text-sm text-slate-600">Course Price</span>
              <span className="font-semibold text-slate-800">
                ₹{detailcourse.price}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 py-3">
              <span className="text-sm text-slate-600">Tuition Fee</span>
              <span className="font-semibold text-slate-800">
                ₹{detailcourse.gst}
              </span>
            </div>

            <div className="my-3 border-t border-dashed border-slate-200" />

            <div className="flex items-center justify-between gap-3 py-3">
              <span className="font-bold text-slate-900">Total Amount</span>
              <span className="text-2xl font-bold text-blue-700">
                ₹{Number(detailcourse.gst) + Number(detailcourse.price)}
              </span>
            </div>

            <button
              onClick={() => Enrolment(detailcourse.id)}
              className="mt-4 w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Enroll Now
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Start learning with Study·Spark and build your skills.
            </p>
          </aside>

        </section>

        {/* Course Demo */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Preview
            </span>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Preview of the Course
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Get a preview of the learning experience before enrolling.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl bg-slate-950">
            <MediaController className="aspect-video w-full">
              <ReactPlayer
                src={detailcourse.demo}
                slot="media"
                controls={false}
                style={{
                  width: "100%",
                  height: "100%",
                  "--controle": "none"
                }}
              />

              <MediaControlBar>
                <MediaPlayButton />
                <MediaSeekBackwardButton seekOffset={10} />
                <MediaSeekForwardButton seekOffset={10} />
                <MediaTimeRange />
                <MediaTimeDisplay showDuration />
                <MediaMuteButton />
                <MediaVolumeRange />
                <MediaPlaybackRateButton />
                <MediaFullscreenButton />
              </MediaControlBar>
            </MediaController>
          </div>
        </section>

        {/* Course Modules */}
        <section className="mt-10 mb-12">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Course Content
            </span>

            <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Explore Course Modules
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Open each module to access its lecture.
            </p>
          </div>

          <div className="space-y-4">
            {detailcourse.urls.map((i, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200"
              >
                <Accordion>
                  <AccordionItem
                    header={
                      <div className="flex w-full items-center gap-4 py-1 text-left">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900">
                            Module {index + 1}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Course lecture · Video lesson
                          </p>
                        </div>

                        <span className="mr-2 hidden rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 sm:inline-block">
                          View Lecture
                        </span>
                      </div>
                    }
                  >
                    <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-6">
                      <h4 className="mb-4 font-semibold text-slate-800">
                        Course Lecture {index + 1}
                      </h4>

                      <div className="overflow-hidden rounded-xl bg-slate-950">
                        <MediaController className="aspect-video w-full">
                          <ReactPlayer
                            src={i}
                            slot="media"
                            controls={false}
                            style={{
                              width: "100%",
                              height: "100%",
                              "--controle": "none"
                            }}
                          />

                          <MediaControlBar>
                            <MediaPlayButton />
                            <MediaSeekBackwardButton seekOffset={10} />
                            <MediaSeekForwardButton seekOffset={10} />
                            <MediaTimeRange />
                            <MediaTimeDisplay showDuration />
                            <MediaMuteButton />
                            <MediaVolumeRange />
                            <MediaPlaybackRateButton />
                            <MediaFullscreenButton />
                          </MediaControlBar>
                        </MediaController>
                      </div>
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Enrolment Banner */}
        <section className="mb-10 overflow-hidden rounded-2xl bg-blue-700 px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Ready to Start Learning?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Enroll in this course and take the next step in your learning journey.
              </p>
            </div>

            <button
              onClick={() => Enrolment(detailcourse.id)}
              className="w-full rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 transition hover:bg-blue-50 sm:w-auto"
            >
              ENROLL NOW
            </button>
          </div>
        </section>

      </main>

      <Footer url={url} />
    </div>
  )
}

export default Couresedetail
