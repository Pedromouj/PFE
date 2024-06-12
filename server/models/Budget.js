const db = require("../database/db");

class Budget {
  #categoryId;
  #userId;
  amount;
  period;
  start_date;
  end_date;

  constructor(userId, categoryId, amount, period, start_date, end_date) {
    this.amount = amount;
    this.period = period;
    this.start_date = start_date;
    this.end_date = end_date;
    this.#categoryId = categoryId;
    this.#userId = userId;
  }

  getCategoryId() {
    return this.#categoryId;
  }

  setCategoryId(CategoryId) {
    this.#categoryId = CategoryId;
  }

  getUserId() {
    return this.#userId;
  }

  setUserId(user_id) {
    this.#userId = user_id;
  }

  ShowBudgets() {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "SELECT budgets.* , categories.name , categories.id as cat_id  FROM  budgets  inner join categories ON  budgets.category_id  = categories.id  where budgets.user_id  = ?";
      db.query(sqlQuery, [this.#userId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  createBudgetes() {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "INSERT INTO budgets (user_id  , category_id ,amount , period , start_date , end_date)  VALUES (? , ? , ? , ? , ? , ?)";
      db.query(
        sqlQuery,
        [
          this.#userId,
          this.#categoryId,
          this.amount,
          this.period,
          this.start_date,
          this.end_date,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  updateBudgets(idBudget) {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "UPDATE budgets set category_id  = ? , amount = ? , period = ? , start_date = ? , end_date = ? WHERE user_id = ? AND id = ?";
      db.query(
        sqlQuery,
        [
          this.#categoryId,
          this.amount,
          this.period,
          this.start_date,
          this.end_date,
          this.#userId,
          idBudget,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  deleteBudget(idBudget) {
    return new Promise((resolve, reject) => {
      const sqlQuery = "DELETE FROM  budgets WHERE user_id = ? AND id = ?";
      db.query(sqlQuery, [this.#userId, idBudget], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  TotalBudgetsRevenu(type) {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "SELECT SUM(amount) as totale FROM budgets inner join categories ON budgets.category_id = categories.id WHERE categories.type like ? and budgets.user_id = ?";
      db.query(sqlQuery, [type, this.#userId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  calculBudgetByMonth(date_debut, date_fin) {
    return new Promise((resolve, reject) => {
      const sqlQuery = `
      SELECT 
      DATE_FORMAT(start_date, '%Y-%m-01') AS libelle, 
      SUM(amount) AS totalBudget 
    FROM budgets 
    WHERE user_id = ?
      AND start_date >= ?
      AND end_date <= ?
    GROUP BY libelle 
    ORDER BY libelle;
      `;
      db.query(sqlQuery, [this.#userId, date_debut, date_fin], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  calculBudgetByCategory() {
    return new Promise((resolve, reject) => {
      const sqlQuery = `
      SELECT categories.name  as libelle, SUM(amount) AS totalBudget FROM budgets inner join categories ON budgets.category_id = categories.id WHERE budgets.user_id = ? GROUP BY libelle ORDER BY categories.created_at;
      `;
      db.query(sqlQuery, [this.#userId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  calculBudgetByType() {
    return new Promise((resolve, reject) => {
      const sqlQuery = `
      SELECT categories.type  as libelle, SUM(amount) AS totalBudget FROM budgets inner join categories ON budgets.category_id = categories.id WHERE budgets.user_id = ? GROUP BY libelle ORDER BY categories.created_at;
      `;
      db.query(sqlQuery, [this.#userId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = Budget;
