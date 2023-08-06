require("dotenv").config();
const getDb = require("../../db/getDb");

async function filterExercises(req, res) {
  const { user_id, exercise_id, name, muscleGroup } = req.query;
  if (Object.keys(req.query).length === 0) {
    return res.status(400).json("No hay parámetros");
  }

  let connection;
  try {
    connection = await getDb();
    // Verificar si el usuario está registrado
    if (user_id) {
      const [user] = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [user_id]
      );
      if (!user.length) {
        return res.status(400).json("El usuario no está registrado");
      }
    }
    // Filtrar ejercicios
    let query = "SELECT * FROM exercises";
    let queryParams = [];
    if (exercise_id) {
      query += " WHERE id = ?";
      queryParams.push(exercise_id);
    } else if (name) {
      query += " WHERE name LIKE ?";
      queryParams.push(`%${name}%`);
    } else if (user_id) {
      query =
        "SELECT e.* FROM exercises e JOIN favorites f ON e.id = f.exercise_id WHERE f.user_id = ?";
      queryParams.push(user_id);
    } else if (muscleGroup) {
      query += " WHERE muscleGroup = ?";
      queryParams.push(muscleGroup);
    }
    const [result] = await connection.query(query, queryParams);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Hubo un error");
  } finally {
    if (connection) connection.release();
  }
}

module.exports = filterExercises;
