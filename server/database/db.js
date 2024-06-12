const mysql = require("mysql2");
const db = mysql.createConnection({
  host: process.env.SERVER_NODE_DB_HOST,
  user: process.env.SERVER_NODE_DB_USER,
  database: process.env.SERVER_NODE_DB_DATABASE,
  password: process.env.SERVER_NODE_DB_PASSWORD,
});
module.exports = db;
