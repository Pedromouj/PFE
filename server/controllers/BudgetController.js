const authenticateToken = require("../Tools/authanticateToken");
const Budget = require("../models/Budget");
const Transactions = require("../models/Transactions");

class BudgetController {
  async getAllBudgets(req, res) {
    try {
      const { userId } = req.params;
      const budget = new Budget();
      budget.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await budget.ShowBudgets();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async insertBudgetsController(req, res) {
    try {
      const { userId, categoryId, amount, period, start_date, end_date } =
        req.body;
      await authenticateToken(req, res, async () => {
        const budget = new Budget(
          userId,
          categoryId,
          amount,
          period,
          start_date,
          end_date
        );
        await budget.createBudgetes();
        res.json({ success: "Budget inserted successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem  in the server" });
    }
  }

  async UpdateBudgetController(req, res) {
    try {
      const {
        idBudget,
        userId,
        categoryId,
        amount,
        period,
        start_date,
        end_date,
      } = req.body;
      await authenticateToken(req, res, async () => {
        const budget = new Budget(
          userId,
          categoryId,
          amount,
          period,
          start_date,
          end_date
        );
        await budget.updateBudgets(idBudget);
        res.json({ success: "Budget updated successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async DeleteBudgets(req, res) {
    try {
      const { idBudget, userId } = req.params;
      const budget = new Budget();
      budget.setUserId(userId);
      await authenticateToken(req, res, async () => {
        await budget.deleteBudget(idBudget);
        res.json({ success: "Budget deleted successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async CalculBudgets(req, res) {
    try {
      const { userId, date_debut, date_fin } = req.body;
      const budget = new Budget();
      budget.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await budget.calculBudgetByMonth(date_debut, date_fin);
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async CalculBudgetsByCategory(req, res) {
    try {
      const { userId } = req.params;
      const budget = new Budget();
      budget.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await budget.calculBudgetByCategory();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async CalculBudgetsByType(req, res) {
    try {
      const { userId } = req.params;
      const budget = new Budget();
      budget.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await budget.calculBudgetByType();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }
}

module.exports = new BudgetController();
