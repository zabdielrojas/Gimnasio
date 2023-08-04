require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");

async function addExercisesModel(ejercicio) {
  let connection;
  try {
    connection = await getDb();
    await connection.query(
      `INSERT INTO exercises (name, description, muscleGroup, photo, user_id) VALUES (?,?,?,?,?)`,
      [
        ejercicio.name,
        ejercicio.description,
        ejercicio.muscleGroup,
        ejercicio.photoName,
        ejercicio.user_id,
      ]
    );
  } finally {
    if (connection) connection.release();
  }
}

module.exports = addExercisesModel;
