import express from "express"
import { Addfeedback, DeleteFeedback, Getfeedback } from "../controller/Feedback-controller.js";
import { cacheMiddleware } from "../middleware/cache-middleware.js";
const FeedbackRouter=express.Router();
FeedbackRouter.post("/add_feedback",Addfeedback);
FeedbackRouter.get("/get_feedback",cacheMiddleware(3),Getfeedback);
FeedbackRouter.delete("/del_feedback",DeleteFeedback);
export default FeedbackRouter;