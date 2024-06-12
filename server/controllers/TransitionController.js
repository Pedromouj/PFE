const authenticateToken = require("../Tools/authanticateToken");
const Transactions = require("../models/Transactions");

class TransitionController {
  async getAllTranscations(req, res) {
    try {
      const query = req.query.q;
      const { userId } = req.params;
      const tr = new Transactions();
      tr.setUserId(userId);
      await authenticateToken(req, res, async () => {
        var data = [];
        if (query !== undefined) {
          data = await tr.searchByTerm(query);
        } else {
          data = await tr.findAllTransaction();
        }
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's Problem in the server" });
    }
  }

  async CreateTranscations(req, res) {
    try {
      const { user_id, category_id, amount, transaction_date, description } =
        req.body;
      await authenticateToken(req, res, async () => {
        const tr = new Transactions(
          user_id,
          category_id,
          amount,
          transaction_date,
          description
        );
        await tr.CreateTransaction();
        res.json({ success: "Transaction created successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's Problem in the server" });
    }
  }

  async UpdateTranscations(req, res) {
    try {
      const {
        idCat,
        user_id,
        category_id,
        amount,
        transaction_date,
        description,
      } = req.body;
      await authenticateToken(req, res, async () => {
        const tr = new Transactions(
          user_id,
          category_id,
          amount,
          transaction_date,
          description
        );
        await tr.UpdateTransaction(idCat);
        res.json({ success: "Transaction updated successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's Problem in the server" });
    }
  }

  async TotalTransitionController(req, res) {
    try {
      const { userId } = req.body;
      const transition = new Transactions();
      transition.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await transition.getSummaryReport();
        const totaleT = await transition.totaleTransition();
        res.json([
          {
            color: "gray",
            type: "balance",
            title: "Solde",
            value: data[0]?.balance !== null ? data[0]?.balance : 0,
            footer: {
              color: "text-red-500",
              value: "0%",
              label: "than yesterday",
            },
          },
          {
            color: "gray",
            type: "revenu",
            title: "Revenu totales",
            value: data[0]?.Total_income !== null ? data[0]?.Total_income : 0,
            footer: {
              color: "text-green-500",
              value: "+55%",
              label: "than last week",
            },
          },
          {
            color: "gray",
            type: "Frais",
            title: "Frais totales",
            value:
              data[0]?.Totale_expense !== null ? data[0]?.Totale_expense : 0,
            footer: {
              color: "text-green-500",
              value: "+3%",
              label: "than last month",
            },
          },
          {
            color: "gray",
            type: "transactions",
            title: "Transactions",
            value: totaleT[0]?.totale !== null ? totaleT[0]?.totale : 0,
            footer: {
              color: "text-red-500",
              value: "-2%",
              label: "than yesterday",
            },
          },
        ]);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async SummaryReport(req, res) {
    try {
      const { userId } = req.params;
      const trans = new Transactions();
      trans.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await trans.getSummaryReport();
        res.json(data[0]);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async FraisByMonthController(req, res) {
    try {
      const { userId, type } = req.body;
      const trans = new Transactions();
      trans.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await trans.calculFraisByMonth(type);
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async LatestTransactionController(req, res) {
    try {
      const { userId } = req.params;
      const trs = new Transactions();
      trs.setUserId(userId);
      await authenticateToken(req, res, async () => {
        const data = await trs.latestTransactions();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }
}

module.exports = new TransitionController();
