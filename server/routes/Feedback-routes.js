import express from "express"
import { Addfeedback, DeleteFeedback, Getfeedback } from "../controller/Feedback-controller.js";
const FeedbackRouter=express.Router();
FeedbackRouter.post("/add_feedback",Addfeedback);
FeedbackRouter.get("/get_feedback",Getfeedback);
FeedbackRouter.delete("/del_feedback",DeleteFeedback);
export default FeedbackRouter;