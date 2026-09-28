import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { control } from '../Redux/slice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
    <div>
    <Navbar url={url}/>
        <div>
            <div>
                <h1>attempt mock quiz for concept clarity </h1>
            </div>
            <div>
                {quizmaindata.length===0&&<h1>No Quiz Is Present </h1>}
            </div>
            {quizmaindata.map((i,index)=>(
                <div key={i._id}>
                    <h1>Srno:{index+1}</h1>
                    <h1>Quiz-Topic:{i.subject}</h1>
                    <button onClick={()=>Navigationupdate(i._id,i.questions)}>attempt quiz </button>
                    
                </div>

            ))}
        </div>
        <Footer url={url}/>
       
    </div>
  )
}

export default Quiz
