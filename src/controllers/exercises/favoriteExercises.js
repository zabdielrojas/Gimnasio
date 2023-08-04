require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");

async function exercisesFavorite(userId, exerciseId) {
  let connection;
  try {
    connection = await getDb();
    const [result] = await connection.query(
      "SELECT * FROM favorites WHERE user_id = ? AND exercise_id = ?",
      [userId, exerciseId]
    );
    if (result.length > 0) {
      await connection.query(
        "DELETE FROM favorites WHERE user_id = ? AND exercise_id = ?",
        [userId, exerciseId]
      );
      console.log("Ejercicio eliminado de favoritos!");
    } else {
      await connection.query(
        "INSERT INTO favorites (user_id, exercise_id) VALUES (?, ?)",
        [userId, exerciseId]
      );
      console.log("Ejercicio añadido a favoritos!");
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = exercisesFavorite;
