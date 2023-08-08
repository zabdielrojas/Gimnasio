require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");

const deletePhotoService = require("../../services/deletePhotoService");

async function deleteExercisesModel(exercise_id) {
  let connection;
  try {
    connection = await getDb();

    // Primero verificamos que el ejercicio existe
    const [exercise] = await connection.query(
      `SELECT id, photo FROM exercises WHERE id = ?`,
      [exercise_id]
    );
    console.log(exercise_id)

    // Si el ejercicio no existe, lanzamos un error
    if (exercise.length === 0) {
      throw new Error("El ejercicio que intentas eliminar no existe.");
    }

    // Eliminamos la foto asociada al ejercicio
    await deletePhotoService(exercise[0].photo);

    // Si todo está en orden, procedemos a eliminar el ejercicio
    await connection.query(`DELETE FROM exercises WHERE id = ?`, [exercise_id]);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = deleteExercisesModel;
