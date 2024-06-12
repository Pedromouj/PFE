const db = require("../database/db");

class Transactions {
  #user_id;
  #category_id;
  amount;
  transaction_date;
  description;

  constructor(user_id, category_id, amount, transaction_date, description) {
    this.#user_id = user_id;
    this.#category_id = category_id;
    this.amount = amount;
    this.transaction_date = transaction_date;
    this.description = description;
  }

  getUserId() {
    return this.#user_id;
  }

  setUserId(userId) {
    this.#user_id = userId;
  }

  getCategoryId() {
    return this.#category_id;
  }

  setCategoryId(category_id) {
    this.#category_id = category_id;
  }

  findAllTransaction() {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "SELECT transactions.* , categories.name , categories.type FROM transactions inner join categories ON transactions.category_id  = categories.id   where transactions.user_id  = ? ";
      db.query(sqlQuery, [this.#user_id], (err, res) => {
        if (!this.#user_id) {
          reject(new Error("user id  are required."));
          return;
        }
        resolve(res);
      });
    });
  }

  CreateTransaction() {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "INSERT INTO transactions (user_id  , category_id  , amount , transaction_date , description) VALUES(? , ? , ? , ? , ?)";
      db.query(
        sqlQuery,
        [
          this.#user_id,
          this.#category_id,
          this.amount,
          this.transaction_date,
          this.description,
        ],
        (err, res) => {
          if (!this.#user_id || !this.#category_id) {
            reject(new Error("user id  are required."));
            return;
          }
          resolve(res);
        }
      );
    });
  }

  UpdateTransaction(idCat) {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "UPDATE transactions SET  category_id = ? ,  amount = ? , transaction_date = ? , description = ?  where id = ? and user_id = ?";
      db.query(
        sqlQuery,
        [
          this.#category_id,
          this.amount,
          this.transaction_date,
          this.description,
          idCat,
          this.#user_id,
        ],
        (err, res) => {
          if (!this.#user_id || !this.#category_id) {
            reject(new Error("user id  are required."));
            return;
          }
          resolve(res);
        }
      );
    });
  }

  TotalTransitionByType(type) {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "SELECT SUM(amount) as totale FROM transactions inner join categories ON transactions.category_id  = categories.id WHERE categories.type like ? and transactions.user_id = ?";
      db.query(sqlQuery, [type, this.#user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  totaleTransition() {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "SELECT COUNT(*) as totale FROM transactions where user_id  = ? ";
      db.query(sqlQuery, [this.#user_id], (err, res) => {
        if (!this.#user_id) {
          reject(new Error("user id  are required."));
          return;
        }
        resolve(res);
      });
    });
  }

  getSummaryReport() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
      COALESCE(SUM(CASE WHEN categories.type = 'revenu' THEN transactions.amount ELSE 0 END), 0) AS 'Total_income',
      COALESCE(SUM(CASE WHEN categories.type = 'frais' THEN transactions.amount ELSE 0 END), 0) AS 'Totale_expense',
      (COALESCE(SUM(CASE WHEN categories.type = 'revenu' THEN transactions.amount ELSE 0 END), 0) - 
       COALESCE(SUM(CASE WHEN categories.type = 'frais' THEN transactions.amount ELSE 0 END), 0)) AS balance
    FROM transactions 
    INNER JOIN categories ON transactions.category_id = categories.id
    WHERE transactions.user_id = ?;
  `;

      db.query(query, [this.#user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  calculFraisByMonth(type) {
    return new Promise((resolve, reject) => {
      const query = `
       SELECT MONTHNAME(DATE_FORMAT(transaction_date, '%Y-%m-01')) AS month, SUM(amount) AS total FROM transactions INNER JOIN categories ON transactions.category_id = categories.id WHERE transactions.user_id = ? AND categories.type = ? GROUP BY month ORDER BY DATE_FORMAT(transaction_date, '%Y-%m-01')
    `;
      db.query(query, [this.#user_id, type], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  latestTransactions() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT transactions.* , categories.name , categories.type FROM transactions inner join categories ON transactions.category_id  = categories.id  ORDER BY transaction_date  DESC  LIMIT 4
    `;
      db.query(query, [this.#user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  searchByTerm(term) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT transactions.* , categories.name , categories.type  FROM  transactions  inner join categories on transactions.category_id  = categories.id   where transactions.user_id = ? and categories.name like ? OR categories.type like ?   OR amount = ? or transaction_date like ?  or description like ?";

      const searchTerm = `%${term}%`;

      db.query(
        query,
        [this.#user_id, searchTerm, searchTerm, term, searchTerm, searchTerm],
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
}

module.exports = Transactions;
