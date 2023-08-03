require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("./getDb");

async function removeFromFavorites(userId, exerciseId) {
  let connection;
  try {
    connection = await getDb();
    await connection.query(
      "DELETE FROM favorites WHERE user_id = ? AND exercise_id = ?",
      [userId, exerciseId]
    );
    console.log("Ejercicio eliminado de favoritos!");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = removeFromFavorites;
