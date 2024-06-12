const db = require("../database/db");
class Categories {
  libelle = "";
  type = "";
  #userId;
  constructor(userId, libelle, type) {
    this.#userId = userId;
    this.libelle = libelle;
    this.type = type;
  }

  getId() {
    return this.#userId;
  }

  setIdUser(user) {
    this.#userId = user;
  }

  getAllCategory() {
    return new Promise((resolve, reject) => {
      const sqlQuery = "SELECT * FROM categories where user_id =  ?";
      db.query(sqlQuery, [this.#userId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  insertCategory() {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "INSERT INTO categories (user_id  , name , type ) VALUES(? , ? , ?)";
      db.query(
        sqlQuery,
        [this.#userId, this.libelle, this.type],
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

  UpdateCategory(id) {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "UPDATE categories SET  name = ? , type = ?  WHERE id = ? and user_id  = ?";
      db.query(
        sqlQuery,
        [this.libelle, this.type, id, this.#userId],
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

  DeleteCategory(idCat) {
    return new Promise((resolve, reject) => {
      const sqlQuery = "Delete from categories where id = ? and user_id = ? ";
      db.query(sqlQuery, [idCat, this.#userId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  ChartCategory() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT categories.name , SUM(amount) AS total_amount
      FROM transactions
      JOIN categories ON transactions.category_id  = categories.id
      WHERE categories.type like 'frais' and categories.user_id = ?
      GROUP BY categories.name
    `;
      db.query(query, [this.#userId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  latestCategories() {
    return new Promise((resolve, reject) => {
      const query = `
       SELECT * FROM categories WHERE user_id = ? ORDER BY created_at DESC LIMIT 4
    `;
      db.query(query, [this.#userId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = Categories;
