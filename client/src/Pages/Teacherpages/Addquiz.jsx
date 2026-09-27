import React from 'react'
import axios from "axios"
import { control } from '../../Redux/slice'
import {toast} from "react-hot-toast"
import {useDispatch,useSelector} from "react-redux"
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
  return (
    <div>
        {!quizstatus?<button onClick={()=>dispatch(control.setquizstatus(true))}>Add quiz</button>:<button onClick={statuscancel}>Cancel</button>}
        <div>
            {quizstatus&&!quizlen &&(<form>
           
        <label htmlFor='noofquestions'> set No of questions </label>           
        <input onChange={(e)=>dispatch(control.settotalquestions(e.target.value))} type="number"id="noofquestions" placeholder='No of questions'/>
        <button onClick={Setnoofquestions} type="button">Set</button>
           
            </form>)}

        </div>
        {quizlen&&<div>
            <form onSubmit={Addquizquestions}>
                <div>
                    <label htmlFor='sub'>Subject</label>
                    <input type="text" id="sub"placeholder='Enter subject'value={quizsubject} onChange={(e)=>dispatch(control.setquizsubject(e.target.value))}/>
                </div>
                {quizquestions.map((item,index)=>(
                    <div key={index} style={{border:"1px solid gray",padding:"20px",marginTop:"20px"}}>
                        <h3>Question {index+1}</h3>
                        <input type="text" placeholder='Enter question' value={item.question} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"question",value:e.target.value}))}/>
                        <input type="text" placeholder='Option 1' value={item.option1} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option1",value:e.target.value}))}/>
                        <input type="text" placeholder='Option 2' value={item.option2} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option2",value:e.target.value}))}/>
                        <input type="text" placeholder='Option 3' value={item.option3} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option3",value:e.target.value}))}/>
                        <input type="text" placeholder='Option 4' value={item.option4} onChange={(e)=>dispatch(control.updatequizquestion({index,name:"option4",value:e.target.value}))}/>
                        <select
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
                <button type="submit">Add Quiz</button>
           
            </form>
            </div>}
        
      
    </div>
  )
}

export default Addquiz

