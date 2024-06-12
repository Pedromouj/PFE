const db = require("../database/db");

class Utilisateurs {
  username;
  email;
  #password;

  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.#password = password;
  }

  getPassword() {
    return this.#password;
  }

  setPassword(password) {
    this.#password = password;
  }

  authentification() {
    return new Promise((resolve, reject) => {
      // Validate inputs (e.g., username and email)
      if (!this.username || !this.email) {
        reject(new Error("Username and email are required."));
        return;
      }

      // Use parameterized query to prevent SQL injection
      const sqlQuery = "SELECT * FROM users WHERE username = ? OR email = ?";

      // Execute the query with sanitized parameters
      db.query(sqlQuery, [this.username, this.email], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  sincrire() {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "INSERT INTO users (username , email , password) VALUES (? , ? , ?)";
      db.query(
        sqlQuery,
        [this.username, this.email, this.#password],
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

module.exports = Utilisateurs;
