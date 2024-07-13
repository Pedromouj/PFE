const db = require("../database/db");

class Goals {
  name;
  #montant_cible;
  #montant_actuel;
  date_limite;
  #user_id;

  constructor(name, montant_cible, montant_actuel, date_limite, user_id) {
    this.name = name;
    this.#montant_cible = montant_cible;
    this.#montant_actuel = montant_actuel;
    this.date_limite = date_limite;
    this.#user_id = user_id;
  }

  getMontantcible() {
    return this.#montant_cible;
  }

  setMontantcible(montant_cible) {
    this.#montant_cible = montant_cible;
  }

  getMontantActuel() {
    return this.#montant_actuel;
  }

  setMontantActuel(montant_actuel) {
    this.#montant_actuel = montant_actuel;
  }

  getUserId() {
    return this.#user_id;
  }

  setUserId(userId) {
    this.#user_id = userId;
  }

  showAllGoals() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM goals where user_id = ?";
      db.query(sql, [this.#user_id], (err, res) => {
        if (!this.#user_id || err) {
          reject(new Error("user_id can not be null"));
        } else {
          resolve(res);
        }
      });
    });
  }

  AddGoals() {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO goals (user_id  , name , montant_cible , montant_actuel , date_limite)  VALUES (? , ? , ? , ? , ?)";
      db.query(
        sql,
        [
          this.#user_id,
          this.name,
          this.#montant_cible,
          this.#montant_actuel,
          this.date_limite,
        ],
        (err, res) => {
          if (!this.#user_id || err) {
            reject(new Error("user_id can not be null"));
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  UpdateGoals(id) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE goals set name = ? , montant_cible = ? , montant_actuel = ? , date_limite = ?  WHERE id = ?  and user_id  = ? ";
      db.query(
        sql,
        [
          this.name,
          this.#montant_cible,
          this.#montant_actuel,
          this.date_limite,
          id,
          this.#user_id,
        ],
        (err, res) => {
          if (!this.#user_id || err) {
            reject(new Error("user_id can not be null"));
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  DeleteGoal(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM goals  WHERE id = ?  AND user_id  = ? ";
      db.query(sql, [id, this.#user_id], (err, res) => {
        if (!this.#user_id || err) {
          reject(new Error("user_id can not be null"));
        } else {
          resolve(res);
        }
      });
    });
  }

  latestGoals() {
    return new Promise((resolve, reject) => {
      const query = `
       SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC LIMIT 4
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

  Allnotifications() {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM goals WHERE user_id = ? and status = 1 ORDER BY date_limite DESC LIMIT 3";
      db.query(query, [this.#user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  countNotifications() {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT COUNT(*) as count_notification FROM goals WHERE user_id = ? and show_notfication = 1";
      db.query(query, [this.#user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  UpdateNotifications() {
    return new Promise((resolve, reject) => {
      const query = "UPDATE goals set show_notfication = 0 WHERE user_id = ?";
      db.query(query, [this.#user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  NotificationsUpdateAfterProcess(date_limite) {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE goals set show_notfication = 1 WHERE user_id = ? and date_limite = ?";
      db.query(query, [this.#user_id, date_limite], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  updateGoalByDate(reviews, timestamp) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE goals SET reviews = ? , status = 1 WHERE date_limite = ? and  user_id  = ?";
      db.query(sql, [reviews, timestamp, this.#user_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  AvergeRating() {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT CAST(AVG(goals.reviews) AS INT) as moyenne FROM goals WHERE user_id  = ? and reviews != -1";
      db.query(sql, [this.#user_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Goals;
