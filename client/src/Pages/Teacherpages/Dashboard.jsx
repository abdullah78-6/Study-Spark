import React, { useEffect, useState } from 'react'
import axios from "axios"
const Dashboard = ({url}) => {
  let [data,setdata]=useState([])
  const fetch=async()=>{
    const res=await axios.get(url+"/api/dash/get_dash",{
          withCredentials:true
    })
    if(res.data.status){
      setdata({
        courses:res.data.courses,
        notes:res.data.notes,
        pyq:res.data.pyq,
        studentenroll:res.data.studentenroll,
        quizes:res.data.quizes,
        feedback:res.data.feedback
      });
      
    }
  }
  useEffect(()=>{
    fetch();
  },[])
  const dashboard_items=[
      { title: 'Courses', value: data.courses },
        { title: 'Notes', value: data.notes },
        { title: 'PYQs', value: data.pyq },
        { title: 'Student Enrollments', value: data.studentenroll },
        { title: 'Quizzes', value: data.quizes },
        { title: 'Feedback', value: data.feedback }
  ]
  return (
        <div className="min-h-screen bg-blue-50 p-6">
            <h1 className="mb-6 text-3xl font-bold text-blue-900">
                Teacher Dashboard
            </h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {dashboard_items.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm"
                    >
                        <h2 className="text-lg font-medium text-gray-600">
                            {item.title}
                        </h2>

                        <p className="mt-3 text-3xl font-bold text-blue-700">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard
