import axios from "axios"
import {GoogleGenerativeAI} from "@google/generative-ai"
const Sendmessage=async(req,res)=>{
    try {
        const {input}=req.body;
        if(!input||typeof input !=="string"||!input.trim()){
            return res.status(400).json({status:false,message:"Please enter a message"});
        }
        // const response=await axios.post(
        //     `${process.env.PYTHON_AI_URL||"http://127.0.0.1:8000"}/chat`,
        //     {
        //         input:input.trim()
        //     },
        //     {
        //         timeout:30000
        //     }
        // );
        const genai=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model=genai.getGenerativeModel({model:"gemini-3.1-flash-lite",
                systemInstruction:`
                You are Study Spark Bot, a friendly AI educational assistant for school and B.Tech students.

                Answer students' doubts in simple language, preferably within 2-3 lines.
                Help with computer science, programming, C++, Python, Java, JavaScript, React, HTML, CSS, DSA, DBMS, operating systems, computer networks, AI, and machine learning.
                Provide practical career tips about internships, placements, resumes, projects, interview preparation, aptitude, and software developer careers.
                Respond naturally to greetings such as hi, hello, and how are you.
                Be friendly, encouraging, accurate, and concise. Use short examples when helpful.
                If a student asks for code or a detailed explanation, provide the necessary detail.
                Never invent facts. If you are unsure, say so honestly.
                Always behave as Study Spark Bot and focus on helping students learn.
                `

            })
            const prompt=` 
            ${input}
            `
            const response=await model.generateContent(prompt);
            const airesult=response.response.text();
            console.log("AI RESULT IS : ",airesult);
        // const aidata=response.data;
        // return res.json({status:true,result:airesult||airesult||"Sorry, I couldn't find an answer",matched:aidata.matched??false,similarity:aidata.similarity??null})
        return res.json({status:true,result:airesult||"Sorry, I couldn't find an answer"})
    } catch (error) {
        console.log("ai server",error);
        return res.json({status:false,result:"Unable to get a response from a ai server "})
    }
}
export {Sendmessage}