import express from "express"
import { Addfeedback, Checkfedback, DeleteFeedback, Getfeedback, Updatefeedback } from "../controller/Feedback-controller.js";
import { cacheMiddleware } from "../middleware/cache-middleware.js";
import Authmiddleware from "../middleware/teacher-auth-middleware.js";
const FeedbackRouter=express.Router();
FeedbackRouter.post("/add_feedback",Addfeedback);
FeedbackRouter.get("/get_feedback",Authmiddleware,cacheMiddleware(3),Getfeedback);
FeedbackRouter.delete("/del_feedback",Authmiddleware,DeleteFeedback);
FeedbackRouter.get("/chk_feedback",Authmiddleware,Checkfedback);
FeedbackRouter.get("/update_feedback",Authmiddleware,Updatefeedback);
export default FeedbackRouter;