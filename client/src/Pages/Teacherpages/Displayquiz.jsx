import React, { useEffect } from 'react'
import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import { control } from '../../Redux/slice';
import toast from "react-hot-toast"
const Displayquiz = ({url}) => {
  const dispatch=useDispatch();
  const totalteacherquiz=useSelector(state=>state.main.totalteacherquiz);
  const fetchquizes=async()=>{
    const res=await axios.get(url+"/api/quiz/getquizadmin",{
      withCredentials:true,
    })
    if(res.data.status){
      dispatch(control.settotalteacherquiz(res.data.result));
    }
    

  }
  useEffect(()=>{
    fetchquizes();
  },[]);
  const Deletequiz=async(id)=>{
    try {
      const res=await axios.delete(url+"/api/quiz/deletequiz",{
        data:{_id:id},
        withCredentials:true,
      })
      if(res.data.status){
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("delete quiz error ",error)
      
    }

       

  }
   return (

    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">



      <div className="fixed top-20 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 -z-0"></div>

      <div className="fixed bottom-10 right-0 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-40 -z-0"></div>


      <div className="relative max-w-6xl mx-auto">



        <div className="text-center mb-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-4">

            <span>📝</span>

            Quiz Management

          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">

            Manage Your Quizzes

          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-7">

            View and manage all the quizzes you have created for
            your students.

          </p>

        </div>




        {totalteacherquiz.length === 0 ? (

          <div className="max-w-xl mx-auto">

            <div className="bg-white border border-blue-100 rounded-3xl shadow-lg shadow-blue-100/40 p-8 sm:p-12 text-center">

              <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-4xl mb-6">

                📝

              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">

                No Quiz Is Present

              </h1>

              <p className="text-slate-500 mt-3 text-sm sm:text-base">

                You haven't created any quizzes yet.

              </p>

            </div>

          </div>

        ) : (



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

            {totalteacherquiz.map((i, index) => (

              <div
                key={i._id}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300"
              >

             

                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 p-5">

             

                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full"></div>

                  <div className="absolute right-8 bottom-0 w-12 h-12 bg-white/5 rounded-full"></div>


                  <div className="relative flex items-center justify-between">

                    <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-xl">

                      📝

                    </div>

                    <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">

                      Quiz {index + 1}

                    </span>

                  </div>

                </div>


             

                <div className="p-5">

                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">

                    Subject

                  </p>

                  <h1 className="text-xl font-bold text-slate-900 truncate">

                    {i.subject}

                  </h1>


                  <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

                    <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">

                      #
                      
                    </span>

                    <span>
                      Quiz Number: <span className="font-semibold text-slate-700">
                        {index + 1}
                      </span>
                    </span>

                  </div>


             

                  <button
                    onClick={() => Deletequiz(i._id)}
                    className="w-full mt-6 py-3 px-4 rounded-xl bg-red-50 border border-red-100 text-red-600 font-semibold text-sm hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                  >

                    Delete Quiz

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )  
}

export default Displayquiz
