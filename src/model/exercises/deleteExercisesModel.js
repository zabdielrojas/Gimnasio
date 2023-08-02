// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("./getDb");

// Función que realiza una consulta a la base de datos para eliminar un entrenamiento.
const deleteExerciseModel = async (id) => {
  let connection;

  try {
    connection = await getDb();

    await connection.query(`DELETE FROM exercises WHERE id = ?`, [id]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteExerciseModel;
