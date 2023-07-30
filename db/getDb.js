const mysql = require("mysql2/promise");

//require("dotenv").config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS } = process.env;

let pool;

const getDb = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        timezone: "Z",
      });
    }

    return await pool.getConnection();
  } catch (err) {
    console.error(err);
  }
};

module.exports = getDb;
