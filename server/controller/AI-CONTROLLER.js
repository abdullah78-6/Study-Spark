import axios from "axios"
const Sendmessage=async(req,res)=>{
    try {
        const {input}=req.body;
        if(!input||typeof input !=="string"||!input.trim()){
            return res.status(400).json({status:false,message:"Please enter a message"});
        }
        const response=await axios.post(
            `${process.env.PYTHON_AI_URL||"http://127.0.0.1:8000"}/chat`,
            {
                input:input.trim()
            },
            {
                timeout:30000
            }
        );
        const aidata=response.data;
        return res.json({status:true,result:aidata.answer||aidata.result||"Sorry, I couldn't find an answer",matched:aidata.matched??false,similarity:aidata.similarity??null})
    } catch (error) {
        console.log("ai server",error);
        return res.json({status:false,result:"Unable to get a response from a ai server "})
    }
}
export {Sendmessage}