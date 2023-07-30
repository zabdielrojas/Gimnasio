const mysql = require("mysql2/promise");

//require("dotenv").config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenará un grupo de conexiones.
let pool;

const getDb = async () => {
  try {
    if (!pool) {
      const dbConnection = await mysql.createConnection({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
      });
       // Con la conexión anterior creamos la base de datos si no existe.
       await dbConnection.query(
        `CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`
    );

    // Creamos un grupo de conexiones.
    pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        timezone: 'Z',
    });
    }
    
// Retornamos una conexión libre.
    return await pool.getConnection();
  } catch (err) {
    console.error(err);
  }
};
// Exportamos la función.

module.exports = getDb;
