require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("./getDb");

async function addToFavorites(userId, exerciseId) {
  let connection;
  try {
    const connection = await getDb();
    await connection.query(
      "INSERT INTO favorites (user_id, exercise_id) VALUES (?, ?)",
      [userId, exerciseId]
    );
    console.log("Exercise added to favorites!");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = addToFavorites;

getDb();
