require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");

async function exercisesFavorite(req, res) {
  //Verificar si el usuario está autenticado
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ error: "Debe estar autentificado para acceder a esta ruta" });
  }
  //Obtener los parámetros userId y exerciseId
  const user_Id = req.user.id;
  const exercise_Id = req.query.exerciseId;

  let connection;
  try {
    connection = await getDb();
    const [result] = await connection.query(
      "SELECT * FROM favorites WHERE user_id = ? AND exercise_id = ?",
      [user_Id, exercise_Id]
    );
    if (result.length > 0) {
      await connection.query(
        "DELETE FROM favorites WHERE user_id = ? AND exercise_id = ?",
        [user_Id, exercise_Id]
      );
      return res.json({ message: "Ejercicio eliminado de favoritos" });
    } else {
      await connection.query(
        "INSERT INTO favorites (user_id, exercise_id) VALUES (?, ?)",
        [user_Id, exercise_Id]
      );
      return res.json({ message: "Ejercicio añadido a favoritos" });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Hubo un error al agregar o eliminar el ejercicio de favoritos",
    });
  } finally {
    if (connection) connection.release();
  }
}

module.exports = exercisesFavorite;
