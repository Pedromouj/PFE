const express = require("express");

const {
  CreateGoalsController,
  showAllGoalsController,
  UpdateGoalsController,
  DeleteGoalsController,
  LatestGoalsController,
  updateGoalReview,
  notificationController,
  CountNotificationController,
  UpdateNotificationController,
  notificationafterProcessController,
  avergeReviewsController,
} = require("../controllers/GoalController");
const GoalRouter = express.Router();

// Define user routes
GoalRouter.post("/create/goals", CreateGoalsController);
GoalRouter.get("/allGoals/:userId", showAllGoalsController);
GoalRouter.get("/notification/:userId", notificationController);
GoalRouter.get("/count/notification/:userId", CountNotificationController);
GoalRouter.get("/avergeRating/:userId", avergeReviewsController);
GoalRouter.get("/latestGoals/:userId", LatestGoalsController);
GoalRouter.put("/update/goals", UpdateGoalsController);
GoalRouter.put("/update/reviews", updateGoalReview);
GoalRouter.put("/update/notification", UpdateNotificationController);
GoalRouter.put(
  "/update/notification/process",
  notificationafterProcessController
);
GoalRouter.delete("/delete/category/:idGoal/:userId", DeleteGoalsController);
module.exports = GoalRouter;
