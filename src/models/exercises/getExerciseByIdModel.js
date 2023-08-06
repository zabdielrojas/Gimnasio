// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require("../../db/getDb");

// Función que realiza una consulta a la base de datos para seleccionar a un ejercicio por su id.
const getExerciseByIdModel = async (exercise_id) => {
  let connection;

  try {
    connection = await getDb();

    // Comprobamos si hay algún ejercicio con el email proporcionado.
    const [exercise] = await connection.query(
      "SELECT * FROM exercises WHERE id = ?",
      [exercise_id]
    );

    // El array de ejercicios solo podrá contener un único ejercicio con ese id
    // no puede repetirse. Retornamos el ejercicio que se encuentra en la posición 0,
    // es decir, retornamos el objeto en lugar de retornar un array con un elemento.
    return exercise[0];
  } finally {
    if (connection) connection.release();
  }
};

getDb();
module.exports = getExerciseByIdModel;
