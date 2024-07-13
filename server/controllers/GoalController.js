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

  async updateGoalReview(req, res) {
    try {
      const { userId, reviews, timestamp } = req.body;
      const goal = new Goals();
      goal.setUserId(userId);
      await authenticateToken(req, res, async () => {
        await goal.updateGoalByDate(reviews, timestamp);
        res.json({ sucess: "Goal review updated sucessfully" });
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

  async notificationController(req, res) {
    try {
      const { userId } = req.params;
      const goal = new Goals();
      goal.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await goal.Allnotifications();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async CountNotificationController(req, res) {
    try {
      const { userId } = req.params;
      const goal = new Goals();
      goal.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await goal.countNotifications();
        res.json(data[0]);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async UpdateNotificationController(req, res) {
    try {
      const { userId } = req.body;
      const goal = new Goals();
      goal.setUserId(userId);
      await authenticateToken(req, res, async () => {
        await goal.UpdateNotifications();
        res.json({ success: "Notification updated successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async notificationafterProcessController(req, res) {
    try {
      const { userId, date_limite } = req.body;
      const goal = new Goals();
      goal.setUserId(userId);
      await authenticateToken(req, res, async () => {
        await goal.NotificationsUpdateAfterProcess(date_limite);
        res.json({ success: "Notification updated successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async avergeReviewsController(req, res) {
    try {
      const { userId } = req.params;
      const goal = new Goals();
      goal.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await goal.AvergeRating(userId);
        res.json(data[0]);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }
}

module.exports = new GoalController();
