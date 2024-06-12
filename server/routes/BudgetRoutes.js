const express = require("express");
const {
  getAllBudgets,
  DeleteBudgets,
  UpdateBudgetController,
  insertBudgetsController,
  CalculBudgets,
  CalculBudgetsByCategory,
  CalculBudgetsByType,
} = require("../controllers/BudgetController");
const BudgetRouter = express.Router();

// Define user routes
BudgetRouter.get("/allBudget/:userId", getAllBudgets);
BudgetRouter.get("/allBudgetByCategory/:userId", CalculBudgetsByCategory);
BudgetRouter.get("/allBudgetByType/:userId", CalculBudgetsByType);
BudgetRouter.delete("/delete/budgets/:idBudget/:userId", DeleteBudgets);
BudgetRouter.put("/update/budgets", UpdateBudgetController);
BudgetRouter.post("/create/budgets", insertBudgetsController);
BudgetRouter.post("/calcul/budgets", CalculBudgets);
module.exports = BudgetRouter;
