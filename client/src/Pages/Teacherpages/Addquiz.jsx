import React from 'react'
import axios from "axios"
import { control } from '../../Redux/slice'
import {toast} from "react-hot-toast"
import {useDispatch,useSelector} from "react-redux"
const inputClass="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:text-base";
const labelClass="text-sm font-semibold text-slate-700 sm:text-base";
const primaryBtn="rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:text-base";
const cardClass="rounded-3xl border border-blue-100 bg-white p-5 shadow-xl shadow-blue-600/10 sm:p-8";
const Addquiz = ({url}) => {
const dispatch=useDispatch();    
const quizstatus=useSelector(state=>state.main.quizstatus);
const totalquestions=useSelector(state=>state.main.totalquestions);
const quizlen=useSelector(state=>state.main.quizlen);
const quizquestions=useSelector(state=>state.main.quizquestions);
const quizsubject=useSelector(state=>state.main.quizsubject);
const backendemail2=useSelector(state=>state.main.backendemail2);
const Setnoofquestions=()=>{
    const number=Number(totalquestions)
    if(!number||number<=0){
        toast.error("Please enter a valid number of questions");
        return 
    }
    const questions=[]
    for(let i=0;i<number;i++){
        questions.push({
            question:"",
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            correctanswer:""
        })
    }
    dispatch(control.setquizquestions(questions))
    dispatch(control.setquizlen(true))
}
const Addquizquestions=async(e)=>{
    e.preventDefault()
    if(!backendemail2){
        toast.error("Teacher Login Required");
        return 
    }
    if(!quizsubject.trim()){
        toast.error("please enter a subject name")
        return 
    }
    for(let question of quizquestions){
        if(
            !question.question.trim()||
            !question.option1.trim()||
            !question.option2.trim()||
            !question.option3.trim()||
            !question.option4.trim()
        ){
            toast.error("please fill all question fields")
            return 
        }

        
    }
    const quizdata={
        subject:quizsubject,
        questions:quizquestions
    }
    console.log("Quiz Data:",quizdata)
    // api call
    const res=await axios.post(url+"/api/quiz/addquiz",{quizdata},{
        withCredentials:true,
    })
    if(res.data.status){
        toast.success(res.data.message);
    }
    else{
        toast.error(res.data.message);
    }

}
const statuscancel=()=>{
dispatch(control.setquizstatus(false))
dispatch(control.setquizlen(false))
dispatch(control.settotalquestions(""))
dispatch(control.setquizquestions([]))
dispatch(control.setquizsubject(""))
}
//   return ( 
//     <div>
//         {!quizstatus?<button onClick={()=>dispatch(control.setquizstatus(true))}>Add quiz</button>:<button onClick={statuscancel}>Cancel</button>}
//         <div>
//             {quizstatus&&!quizlen &&(<form>
           
//         <label htmlFor='noofquestions'> set No of questions </label>           
//         <input onChange={(e)=>dispatch(control.settotalquestions(e.target.value))} type="number"id="noofquestions" placeholder='No of questions'/>
//         <button onClick={Setnoofquestions} type="button">Set</button>
           
//             </form>)}

//         </div>
//         {quizlen&&<div>
//             <form onSubmit={Addquizquestions}>
//                 <div>
//                     <label htmlFor='sub'>Subject</label>
//                     <input type="text" id="sub"placeholder='Enter subject'value={quizsubject} onChange={(e)=>dispatch(control.setquizsubject(e.target.value))}/>
//                 </div>
//                 {quizquestions.map((item,index)=>(
//                     <div key={index} style={{border:"1px solid gray",padding:"20px",marginTop:"20px"}}>
//                         <h3>Question {index+1}</h3>
//                         <input type="text" placeholder='Enter question' value={item.question} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"question",value:e.target.value}))}/>
//                         <input type="text" placeholder='Option 1' value={item.option1} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option1",value:e.target.value}))}/>
//                         <input type="text" placeholder='Option 2' value={item.option2} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option2",value:e.target.value}))}/>
//                         <input type="text" placeholder='Option 3' value={item.option3} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option3",value:e.target.value}))}/>
//                         <input type="text" placeholder='Option 4' value={item.option4} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option4",value:e.target.value}))}/>
//                         <select
//                         value={item.correctanswer}
//                         onChange={(e)=>dispatch(control.updatequizquestion({index,name:"correctanswer",value:e.target.value}))}
//                         >
//                             <option value="">Select Correct Answer</option>
//                             <option value="option1">Option 1</option>
//                             <option value="option2">Option 2</option>
//                             <option value="option3">Option 3</option>
//                             <option value="option4">Option 4</option>

//                         </select>
//                     </div>
//                 ))}
//                 <button type="submit">Add Quiz</button>
           
//             </form>
//             </div>}
        
      
//     </div>
//   )
return (
    <div className='flex min-h-screen flex-col items-center gap-5 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-10 sm:px-6'>
        {!quizstatus?<button className={primaryBtn} onClick={()=>dispatch(control.setquizstatus(true))}>Add quiz</button>:<button className='rounded-xl border border-blue-200 bg-white px-8 py-3 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:text-base' onClick={statuscancel}>Cancel</button>}
        <div className='w-full max-w-3xl'>
            {quizstatus&&!quizlen &&(<form className={`${cardClass} flex flex-wrap items-center gap-3`}>
           
        <label htmlFor='noofquestions' className={`${labelClass} w-full`}> set No of questions </label>           
        <input className={`${inputClass} min-w-0 flex-1`} onChange={(e)=>dispatch(control.settotalquestions(e.target.value))} type="number"id="noofquestions" placeholder='No of questions'/>
        <button className={`${primaryBtn} w-full sm:w-auto`} onClick={Setnoofquestions} type="button">Set</button>
           
            </form>)}
 
        </div>
        {quizlen&&<div className='w-full max-w-3xl'>
            <form className={`${cardClass} flex flex-col gap-5`} onSubmit={Addquizquestions}>
                <div className='flex flex-col gap-1.5'>
                    <label className={labelClass} htmlFor='sub'>Subject</label>
                    <input className={inputClass} type="text" id="sub"placeholder='Enter subject'value={quizsubject} onChange={(e)=>dispatch(control.setquizsubject(e.target.value))}/>
                </div>
                {quizquestions.map((item,index)=>(
                    <div key={index} className='grid gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 sm:grid-cols-2 sm:p-6'>
                        <h3 className='text-lg font-bold text-slate-900 sm:col-span-2'>Question {index+1}</h3>
                        <input className={`${inputClass} sm:col-span-2`} type="text" placeholder='Enter question' value={item.question} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"question",value:e.target.value}))}/>
                        <input className={inputClass} type="text" placeholder='Option 1' value={item.option1} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option1",value:e.target.value}))}/>
                        <input className={inputClass} type="text" placeholder='Option 2' value={item.option2} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option2",value:e.target.value}))}/>
                        <input className={inputClass} type="text" placeholder='Option 3' value={item.option3} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option3",value:e.target.value}))}/>
                        <input className={inputClass} type="text" placeholder='Option 4' value={item.option4} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option4",value:e.target.value}))}/>
                        <select
                        className={`${inputClass} sm:col-span-2`}
                        value={item.correctanswer}
                        onChange={(e)=>dispatch(control.updatequizquestion({index,name:"correctanswer",value:e.target.value}))}
                        >
                            <option value="">Select Correct Answer</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
 
                        </select>
                    </div>
                ))}
                <button className={`${primaryBtn} w-full`} type="submit">Add Quiz</button>
           
            </form>
            </div>}
        
      
    </div>
  )
}

export default Addquiz

