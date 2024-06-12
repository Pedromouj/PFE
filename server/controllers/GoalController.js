const authenticateToken = require("../Tools/authanticateToken");
const Goals = require("../models/Goals");

class GoalController {
  async showAllGoalsController(req, res) {
    try {
      const { userId } = req.params;
      const goal = new Goals();
      goal.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await goal.showAllGoals();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem  in the server" });
    }
  }

  async UpdateGoalsController(req, res) {
    try {
      const {
        userId,
        name,
        montant_cible,
        montant_actuel,
        date_limite,
        idGoal,
      } = req.body;
      const goal = new Goals(
        name,
        montant_cible,
        montant_actuel,
        date_limite,
        userId
      );
      await authenticateToken(req, res, async () => {
        await goal.UpdateGoals(idGoal);
        res.json({ sucess: "Goal updated sucessfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async CreateGoalsController(req, res) {
    try {
      const { userId, name, montant_cible, montant_actuel, date_limite } =
        req.body;
      const goal = new Goals(
        name,
        montant_cible,
        montant_actuel,
        date_limite,
        userId
      );
      await authenticateToken(req, res, async () => {
        await goal.AddGoals();
        res.json({ sucess: "Goal added sucessfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async DeleteGoalsController(req, res) {
    try {
      const { userId, idGoal } = req.params;
      const goal = new Goals();
      goal.setUserId(userId);
      await authenticateToken(req, res, async () => {
        await goal.DeleteGoal(idGoal);
        res.json({ sucess: "Goal deleted sucessfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async LatestGoalsController(req, res) {
    try {
      const { userId } = req.params;
      const goal = new Goals();
      goal.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await goal.latestGoals();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }
}

module.exports = new GoalController();
