import React, { useEffect } from "react";
import axios from "axios";
import { control } from "../../Redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiUser, FiMessageSquare, FiTrash2, FiBookOpen } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast"
const Feedback = ({ url }) => {
const dispatch = useDispatch();
const backendemail2 = useSelector((state) => state.main.backendemail2 );
const feedbacks = useSelector((state) => state.main.feedbacks);

  const Fetchfeedback = async () => {
    try {
      const res = await axios.get(
        url + "/api/feedback/get_feedback",
        {
          withCredentials: true,
        }
      );

      if (res.data.status) {
        dispatch(control.setfeedbacks(res.data.result));
      }
    } catch (error) {
      console.log("fetch feedback error", error);
    }
  };

  useEffect(() => {
    Fetchfeedback();
  }, []);
const DeleteFeedback=async(_id)=>{
  try {
  const res=await axios.delete(url+"/api/feedback/del_feedback",{
    data:{_id:_id},
    withCredentials:true
  });
  if(res.data.status){
    toast.success(res.data.message);
  } 
  else{
    toast.error(res.data.message);
  }   
  } catch (error) {
    console.log("delete feedback error",error);
    
  }
}
const Notification_update=async()=>{
  try {
    const res=await axios.get(url+"/api/feedback/update_feedback",{
      withCredentials:true
    });
    if(res.data.status){
      dispatch(control.setnoti(res.data.noti));
    }
  } catch (error) {
    console.log("notification update error",error);
  }
}
useEffect(()=>{
  Notification_update();
},[]);
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 lg:px-10">

      {backendemail2 ? (
        <>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                  <FiMessageSquare size={23} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                    Student Feedback
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    View and manage feedback received from students.
                  </p>
                </div>
              </div>
            </div>


            <div className="flex w-fit items-center gap-3 rounded-2xl border border-blue-100 bg-white px-5 py-3 shadow-sm">
              <FiMessageSquare className="text-blue-600" size={20} />

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Total Feedback
                </p>

                <p className="text-xl font-bold text-slate-800">
                  {feedbacks?.length || 0}
                </p>
              </div>
            </div>
          </div>


          {feedbacks && feedbacks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

              {feedbacks.map((i, index) => (
                <motion.div
                  key={i._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                  }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                >


                  <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                        {index + 1}
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Feedback
                        </p>

                        <p className="font-semibold text-slate-700">
                          #{index + 1}
                        </p>
                      </div>
                    </div>

                    <button onClick={()=>DeleteFeedback(i._id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                      title="Delete feedback"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>


                  <div className="space-y-5 px-6 py-6">


                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FiUser size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400">
                          Student Name
                        </p>

                        <p className="mt-1 truncate font-semibold text-slate-800">
                          {i.name}
                        </p>
                      </div>
                    </div>


                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FiMail size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400">
                          Email Address
                        </p>

                        <p className="mt-1 break-all font-medium text-slate-700">
                          {i.email}
                        </p>
                      </div>
                    </div>


                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FiBookOpen size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400">
                          Subject
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {i.subject}
                        </p>
                      </div>
                    </div>


                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FiMessageSquare
                          className="text-blue-600"
                          size={16}
                        />

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Message
                        </p>
                      </div>

                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                        {i.message}
                      </p>
                    </div>

                  </div>


                  <div className="h-1 w-full bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                </motion.div>
              ))}

            </div>
          ) : (
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 text-center shadow-sm"
            >
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                <FiMessageSquare size={34} />
              </div>

              <h2 className="text-xl font-bold text-slate-800">
                No Feedback Yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Student feedback will appear here once students submit
                their responses through the Study·Spark contact page.
              </p>
            </motion.div>
          )}
        </>
      ) : (
        
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[70vh] items-center justify-center"
        >
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
              <FiBookOpen size={34} />
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Teacher Login Required
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Please login as a teacher to view and manage student
              feedback on Study·Spark.
            </p>

          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Feedback

