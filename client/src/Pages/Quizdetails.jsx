// COMMENT WALA REVISION KE LIYE 
// import React, { useEffect, useState } from 'react'
// import { control } from '../Redux/slice'
// import axios from 'axios'
// import { useDispatch,useSelector } from 'react-redux'
// import Navbar from '../components/Navbar'
// import { useNavigate } from 'react-router-dom'
// import Footer from '../components/Footer'
// import toast from 'react-hot-toast'
// const Quizdetails = ({url}) => {
// const dispatch=useDispatch();
// const quizid=useSelector(state=>state.main.quizid);
// const quizdetails=useSelector(state=>state.main.quizdetails);
// const backendemail=useSelector(state=>state.main.backendemail);
// const navigate=useNavigate();
// const [quizscore,setquizscore]=useState(null);
// const[currentquestion,setcurrentquestion]=useState(0);
// const[selectedanswers,setselectedanswers]=useState({})
// const[timer,settimer]=useState(0);
// useEffect(()=>{
//   if(!quizid){
//         navigate("/quiz");
//     }
// },[quizid])
// const quizquestions=quizdetails
// const current=quizquestions[currentquestion]
// useEffect(()=>{
//   if(quizscore!==null){
//     return 
//   }
//   const startTime=Date.now()
//   const interval=setInterval(()=>{
//     const elapsedTime=Math.floor(
//       (Date.now()-startTime)/1000
//     )
//     settimer(elapsedTime);
//   },1000)
//   return ()=>{
//     clearInterval(interval)
//   }

// },[quizscore])
// const formatTime=(totalseconds)=>{
//   const hours=Math.floor(totalseconds/3600)
//   const minutes=Math.floor(
//     (totalseconds%3600)/60
//   )
//   const seconds=totalseconds%60
//   return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
// }
// const handleoptionchange=(e)=>{
//   setselectedanswers({
//     ...selectedanswers,
//     [currentquestion]:e.target.value
//   })
// }
// const NextQuestion=()=>{
//   if(selectedanswers[currentquestion]===undefined){
//     toast.error("Please select an answer")
//     return 
//   }
//   setcurrentquestion(currentquestion+1)
// }
// const Previousquestion=()=>{
//   if(currentquestion>0){
//     setcurrentquestion(currentquestion-1);
//   }
// }
// const evaluatequiz=(e)=>{
//     e.preventDefault();
//     if(selectedanswers[currentquestion]===undefined){
//       toast.error("Please select an answer");
//       return ;
//     }
//     if(!backendemail){
//       toast.error("Student Login Required");
//       return ;
//     }
//     let score=0;
//     quizquestions.forEach((question,index)=>{
//       const correctanswer=question[question.correctanswer];
//       if(selectedanswers[index]===correctanswer){
//         score++;
//       }
//     })
    
//     setquizscore(score);
// }
// if(!quizid){
//   return null;
// }
// if(quizquestions.length===0){
//   return (
//     <div>
//       <Navbar url={url}/>
//       <h1>No Questions Found</h1>
//       <Footer url={url}/>
//     </div>
//   )
// }
// return (
//     <div >
//      <Navbar url={url}/>
//      <div>
      
//         <p>Practise Quizes for better understanding and improving accuracy</p>
//         <h1>Timer:{formatTime(timer)}:hrs/min/sec</h1>
//         {quizscore===null?(
//           <form onSubmit={evaluatequiz}>
//             <div>
//               <h1>Question {currentquestion+1}/{quizquestions.length}</h1>
//               <h2>{current.question}</h2>
//               <div>
//                 <label>
//                   <input
//                   type="radio"
//                   name="answer"
//                   value={current.option1}
//                   checked={
//                     selectedanswers[currentquestion]===current.option1
//                   }
//                   onChange={handleoptionchange}
//                   />
//                   {current.option1}
//                 </label>
//               </div>
//               <div>
//                 <label>
//                   <input
//                   type="radio"
//                   name="answer"
//                   value={current.option2}
//                   checked={
//                     selectedanswers[currentquestion]===current.option2
//                   }
//                   onChange={handleoptionchange}
//                   />
//                   {current.option2}
//                 </label>
//               </div>
//               <div>
//                 <label>
//                   <input
//                   type="radio"
//                   name="answer"
//                   value={current.option3}
//                   checked={
//                     selectedanswers[currentquestion]===current.option3
//                   }
//                   onChange={handleoptionchange}
//                   />
//                   {current.option3}
//                 </label>
//               </div>
//               <div>
//                 <label>
//                   <input
//                   type="radio"
//                   name="answer"
//                   value={current.option4}
//                   checked={
//                     selectedanswers[currentquestion]===current.option4
//                   }
//                   onChange={handleoptionchange}
//                   />
//                   {current.option4}
//                 </label>
//               </div>
//             </div>
//           <div>
//             {currentquestion>0&&(
//               <button onClick={Previousquestion} type="button">Previous</button>
//             )}
//             {currentquestion<quizquestions.length-1?(
//               <button type="button" onClick={NextQuestion}>Next</button>
//             ):(
//               <button type="submit">Submit Quiz</button>
//             )}
//           </div>
//           </form>
//         ):(
//           <div>
//             <h1>your quiz score is {quizscore}/{quizquestions.length}</h1>
//             <h1>Time Taken:{formatTime(timer)}</h1>            
//           </div>

//         )}
//      </div>
//        <Footer url={url}/>
      
     
//     </div>
//   )
// }

// export default Quizdetails
import React, { useEffect, useState } from 'react'
import { control } from '../Redux/slice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'

const Quizdetails = ({ url }) => {

const dispatch = useDispatch();
const quizid = useSelector(state => state.main.quizid);
const quizdetails = useSelector(state => state.main.quizdetails);
const backendemail = useSelector(state => state.main.backendemail);
const navigate = useNavigate();

const [quizscore, setquizscore] = useState(null);
const [currentquestion, setcurrentquestion] = useState(0);
const [selectedanswers, setselectedanswers] = useState({})
const [timer, settimer] = useState(0);

useEffect(() => {
  if (!quizid) {
        navigate("/quiz");
    }
}, [quizid])

const quizquestions = quizdetails
const current = quizquestions[currentquestion]

useEffect(() => {
  if (quizscore !== null) {
    return
  }

  const startTime = Date.now()

  const interval = setInterval(() => {
    const elapsedTime = Math.floor(
      (Date.now() - startTime) / 1000
    )

    settimer(elapsedTime);

  }, 1000)

  return () => {
    clearInterval(interval)
  }

}, [quizscore])

const formatTime = (totalseconds) => {

  const hours = Math.floor(totalseconds / 3600)

  const minutes = Math.floor(
    (totalseconds % 3600) / 60
  )

  const seconds = totalseconds % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const handleoptionchange = (e) => {

  setselectedanswers({
    ...selectedanswers,
    [currentquestion]: e.target.value
  })

}

const NextQuestion = () => {

  if (selectedanswers[currentquestion] === undefined) {
    toast.error("Please select an answer")
    return
  }

  setcurrentquestion(currentquestion + 1)
}

const Previousquestion = () => {

  if (currentquestion > 0) {
    setcurrentquestion(currentquestion - 1);
  }

}

const evaluatequiz = (e) => {

    e.preventDefault();

    if (selectedanswers[currentquestion] === undefined) {
      toast.error("Please select an answer");
      return;
    }

    if (!backendemail) {
      toast.error("Student Login Required");
      return;
    }

    let score = 0;

    quizquestions.forEach((question, index) => {

      const correctanswer = question[question.correctanswer];

      if (selectedanswers[index] === correctanswer) {
        score++;
      }

    })

    setquizscore(score);

}

if (!quizid) {
  return null;
}

if (quizquestions.length === 0) {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar url={url}/>

      <div className="min-h-[60vh] flex items-center justify-center px-4">

        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 px-8 py-12 text-center">

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            No Questions Found
          </h1>

          <p className="text-slate-500 mt-3">
            There are currently no questions available for this quiz.
          </p>

        </div>

      </div>

      <Footer url={url}/>

    </div>
  )
}

return (

    <div className="min-h-screen bg-slate-50">

      <Navbar url={url}/>

      {/* Main Content */}

      <div className="relative overflow-hidden">

        {/* Background decoration */}

        <div className="absolute -top-32 -left-32 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

        <div className="absolute top-20 -right-32 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>


        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

          {/* Heading */}

          <div className="text-center mb-8 sm:mb-10">

            <p className="text-blue-600 font-semibold text-sm sm:text-base mb-2">
              MOCK QUIZ
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Test Your Knowledge
            </h1>

            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base leading-7">
              Practise quizzes for better understanding and improving accuracy
            </p>

          </div>


          {/* Timer */}

          <div className="flex justify-center mb-8">

            <div className="inline-flex items-center gap-3 bg-white border border-blue-100 shadow-sm rounded-full px-5 py-3">

              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                ⏱
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Time Taken
                </p>

                <h1 className="text-sm sm:text-base font-bold text-slate-800">
                  {formatTime(timer)}
                </h1>

              </div>

            </div>

          </div>


          {quizscore === null ? (

            <form onSubmit={evaluatequiz}>

              {/* Quiz Card */}

              <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-blue-100 shadow-xl shadow-blue-100/40 overflow-hidden">

                {/* Blue Header */}

                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 sm:px-8 py-6 sm:py-7 text-white">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>

                      <p className="text-blue-100 text-sm mb-1">
                        Question
                      </p>

                      <h1 className="text-2xl sm:text-3xl font-bold">
                        {currentquestion + 1}
                        <span className="text-blue-100 text-lg sm:text-xl font-medium">
                          {" "} / {quizquestions.length}
                        </span>
                      </h1>

                    </div>

                    <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                      Question {currentquestion + 1}
                    </div>

                  </div>


                  {/* Progress */}

                  <div className="mt-6">

                    <div className="flex justify-between text-xs text-blue-100 mb-2">

                      <span>
                        Progress
                      </span>

                      <span>
                        {Math.round(
                          ((currentquestion + 1) / quizquestions.length) * 100
                        )}%
                      </span>

                    </div>

                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-white rounded-full transition-all duration-300"
                        style={{
                          width: `${((currentquestion + 1) / quizquestions.length) * 100}%`
                        }}
                      ></div>

                    </div>

                  </div>

                </div>


                {/* Question Area */}

                <div className="p-5 sm:p-8 lg:p-10">

                  <div className="mb-8">

                    <p className="text-sm font-semibold text-blue-600 mb-3">
                      Choose the correct answer
                    </p>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-relaxed">
                      {current.question}
                    </h2>

                  </div>


                  {/* Options */}

                  <div className="space-y-4">

                    {/* Option 1 */}

                    <div>

                      <label
                        className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200
                        ${
                          selectedanswers[currentquestion] === current.option1
                          ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                        }`}
                      >

                        <input
                          className="w-5 h-5 accent-blue-600 flex-shrink-0"
                          type="radio"
                          name="answer"
                          value={current.option1}
                          checked={
                            selectedanswers[currentquestion] === current.option1
                          }
                          onChange={handleoptionchange}
                        />

                        <span className="text-sm sm:text-base font-medium text-slate-700">
                          {current.option1}
                        </span>

                      </label>

                    </div>


                    {/* Option 2 */}

                    <div>

                      <label
                        className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200
                        ${
                          selectedanswers[currentquestion] === current.option2
                          ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                        }`}
                      >

                        <input
                          className="w-5 h-5 accent-blue-600 flex-shrink-0"
                          type="radio"
                          name="answer"
                          value={current.option2}
                          checked={
                            selectedanswers[currentquestion] === current.option2
                          }
                          onChange={handleoptionchange}
                        />

                        <span className="text-sm sm:text-base font-medium text-slate-700">
                          {current.option2}
                        </span>

                      </label>

                    </div>


                    {/* Option 3 */}

                    <div>

                      <label
                        className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200
                        ${
                          selectedanswers[currentquestion] === current.option3
                          ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                        }`}
                      >

                        <input
                          className="w-5 h-5 accent-blue-600 flex-shrink-0"
                          type="radio"
                          name="answer"
                          value={current.option3}
                          checked={
                            selectedanswers[currentquestion] === current.option3
                          }
                          onChange={handleoptionchange}
                        />

                        <span className="text-sm sm:text-base font-medium text-slate-700">
                          {current.option3}
                        </span>

                      </label>

                    </div>


                    {/* Option 4 */}

                    <div>

                      <label
                        className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200
                        ${
                          selectedanswers[currentquestion] === current.option4
                          ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                        }`}
                      >

                        <input
                          className="w-5 h-5 accent-blue-600 flex-shrink-0"
                          type="radio"
                          name="answer"
                          value={current.option4}
                          checked={
                            selectedanswers[currentquestion] === current.option4
                          }
                          onChange={handleoptionchange}
                        />

                        <span className="text-sm sm:text-base font-medium text-slate-700">
                          {current.option4}
                        </span>

                      </label>

                    </div>

                  </div>


                  {/* Buttons */}

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-slate-100">

                    {currentquestion > 0 ? (

                      <button
                        onClick={Previousquestion}
                        type="button"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      >
                        ← Previous
                      </button>

                    ) : (

                      <div></div>

                    )}


                    {currentquestion < quizquestions.length - 1 ? (

                      <button
                        type="button"
                        onClick={NextQuestion}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        Next Question →
                      </button>

                    ) : (

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        Submit Quiz ✓
                      </button>

                    )}

                  </div>

                </div>

              </div>

            </form>

          ) : (

            /* Result Card */

            <div className="max-w-2xl mx-auto">

              <div className="bg-white rounded-3xl border border-blue-100 shadow-xl shadow-blue-100/40 overflow-hidden text-center">

                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-10 text-white">

                  <div className="w-20 h-20 mx-auto rounded-full bg-white/15 flex items-center justify-center text-4xl mb-5">
                    🏆
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Quiz Completed!
                  </h1>

                  <p className="text-blue-100 mt-2">
                    Great job on completing your quiz.
                  </p>

                </div>


                <div className="p-7 sm:p-10">

                  <p className="text-sm text-slate-400 font-medium">
                    YOUR QUIZ SCORE
                  </p>

                  <h1 className="text-5xl sm:text-6xl font-bold text-blue-600 mt-3">
                    {quizscore}
                    <span className="text-2xl sm:text-3xl text-slate-400">
                      /{quizquestions.length}
                    </span>
                  </h1>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                    <div className="bg-blue-50 rounded-2xl p-5">

                      <p className="text-sm text-slate-500">
                        Questions
                      </p>

                      <h2 className="text-xl font-bold text-slate-900 mt-1">
                        {quizquestions.length}
                      </h2>

                    </div>


                    <div className="bg-cyan-50 rounded-2xl p-5">

                      <p className="text-sm text-slate-500">
                        Time Taken
                      </p>

                      <h2 className="text-xl font-bold text-slate-900 mt-1">
                        {formatTime(timer)}
                      </h2>

                    </div>

                  </div>


                  <p className="text-slate-500 mt-8 text-sm sm:text-base leading-7">
                    Keep practising and improving your knowledge.
                    Every quiz is another step towards becoming better.
                  </p>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

      <Footer url={url}/>

    </div>
  )
}

export default Quizdetails
