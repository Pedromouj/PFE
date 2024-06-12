const express = require("express");

const {
  CreateGoalsController,
  showAllGoalsController,
  UpdateGoalsController,
  DeleteGoalsController,
  LatestGoalsController,
} = require("../controllers/GoalController");
const GoalRouter = express.Router();

// Define user routes
GoalRouter.post("/create/goals", CreateGoalsController);
GoalRouter.get("/allGoals/:userId", showAllGoalsController);
GoalRouter.get("/latestGoals/:userId", LatestGoalsController);
GoalRouter.put("/update/goals", UpdateGoalsController);
GoalRouter.delete("/delete/category/:idGoal/:userId", DeleteGoalsController);
module.exports = GoalRouter;
