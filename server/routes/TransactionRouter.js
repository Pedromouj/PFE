const express = require("express");
const {
  getAllTranscations,
  UpdateTranscations,
  CreateTranscations,
  TotalTransitionController,
  SummaryReport,
  FraisByMonthController,
  LatestTransactionController,
} = require("../controllers/TransitionController");
const TransitionRouter = express.Router();

// Define user routes
TransitionRouter.get("/allTransaction/:userId", getAllTranscations);
TransitionRouter.get("/latestTransaction/:userId", LatestTransactionController);
TransitionRouter.put("/update/transaction", UpdateTranscations);
TransitionRouter.post("/create/transaction", CreateTranscations);
TransitionRouter.put("/totale/transaction", TotalTransitionController);
TransitionRouter.put("/totale/transactionByMonth", FraisByMonthController);
TransitionRouter.get("/totaleSummary/transaction/:userId", SummaryReport);
module.exports = TransitionRouter;
