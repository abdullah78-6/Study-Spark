import React, { useEffect, useState } from 'react'
import { control } from '../Redux/slice'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
const Quizdetails = ({url}) => {
const dispatch=useDispatch();
const quizid=useSelector(state=>state.main.quizid);
const quizdetails=useSelector(state=>state.main.quizdetails);
const backendemail=useSelector(state=>state.main.backendemail);
const navigate=useNavigate();
const [quizscore,setquizscore]=useState(null);
const[currentquestion,setcurrentquestion]=useState(0);
const[selectedanswers,setselectedanswers]=useState({})
const[timer,settimer]=useState(0);
useEffect(()=>{
  if(!quizid){
        navigate("/quiz");
    }
},[quizid])
const quizquestions=quizdetails
const current=quizquestions[currentquestion]
useEffect(()=>{
  if(quizscore!==null){
    return 
  }
  const startTime=Date.now()
  const interval=setInterval(()=>{
    const elapsedTime=Math.floor(
      (Date.now()-startTime)/1000
    )
    settimer(elapsedTime);
  },1000)
  return ()=>{
    clearInterval(interval)
  }

},[quizscore])
const formatTime=(totalseconds)=>{
  const hours=Math.floor(totalseconds/3600)
  const minutes=Math.floor(
    (totalseconds%3600)/60
  )
  const seconds=totalseconds%60
  return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
}
const handleoptionchange=(e)=>{
  setselectedanswers({
    ...selectedanswers,
    [currentquestion]:e.target.value
  })
}
const NextQuestion=()=>{
  if(selectedanswers[currentquestion]===undefined){
    toast.error("Please select an answer")
    return 
  }
  setcurrentquestion(currentquestion+1)
}
const Previousquestion=()=>{
  if(currentquestion>0){
    setcurrentquestion(currentquestion-1);
  }
}
const evaluatequiz=(e)=>{
    e.preventDefault();
    if(selectedanswers[currentquestion]===undefined){
      toast.error("Please select an answer");
      return ;
    }
    if(!backendemail){
      toast.error("Student Login Required");
      return ;
    }
    let score=0;
    quizquestions.forEach((question,index)=>{
      const correctanswer=question[question.correctanswer];
      if(selectedanswers[index]===correctanswer){
        score++;
      }
    })
    
    setquizscore(score);
}
if(!quizid){
  return null;
}
if(quizquestions.length===0){
  return (
    <div>
      <Navbar url={url}/>
      <h1>No Questions Found</h1>
      <Footer url={url}/>
    </div>
  )
}
return (
    <div >
     <Navbar url={url}/>
     <div>
      
        <p>Practise Quizes for better understanding and improving accuracy</p>
        <h1>Timer:{formatTime(timer)}:hrs/min/sec</h1>
        {quizscore===null?(
          <form onSubmit={evaluatequiz}>
            <div>
              <h1>Question {currentquestion+1}/{quizquestions.length}</h1>
              <h2>{current.question}</h2>
              <div>
                <label>
                  <input
                  type="radio"
                  name="answer"
                  value={current.option1}
                  checked={
                    selectedanswers[currentquestion]===current.option1
                  }
                  onChange={handleoptionchange}
                  />
                  {current.option1}
                </label>
              </div>
              <div>
                <label>
                  <input
                  type="radio"
                  name="answer"
                  value={current.option2}
                  checked={
                    selectedanswers[currentquestion]===current.option2
                  }
                  onChange={handleoptionchange}
                  />
                  {current.option2}
                </label>
              </div>
              <div>
                <label>
                  <input
                  type="radio"
                  name="answer"
                  value={current.option3}
                  checked={
                    selectedanswers[currentquestion]===current.option3
                  }
                  onChange={handleoptionchange}
                  />
                  {current.option3}
                </label>
              </div>
              <div>
                <label>
                  <input
                  type="radio"
                  name="answer"
                  value={current.option4}
                  checked={
                    selectedanswers[currentquestion]===current.option4
                  }
                  onChange={handleoptionchange}
                  />
                  {current.option4}
                </label>
              </div>
            </div>
          <div>
            {currentquestion>0&&(
              <button onClick={Previousquestion} type="button">Previous</button>
            )}
            {currentquestion<quizquestions.length-1?(
              <button type="button" onClick={NextQuestion}>Next</button>
            ):(
              <button type="submit">Submit Quiz</button>
            )}
          </div>
          </form>
        ):(
          <div>
            <h1>your quiz score is {quizscore}/{quizquestions.length}</h1>
            <h1>Time Taken:{formatTime(timer)}</h1>            
          </div>

        )}
     </div>
       <Footer url={url}/>
      
     
    </div>
  )
}

export default Quizdetails
