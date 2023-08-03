require("dotenv").config();

const getDb = require("./getDb");

// Función que retorna el listado de todos los ejercicios.

async function getAllExercises() {
  let connection;
  try {
    connection = await getDb();
    const [results] = await connection.query("SELECT * FROM exercises");
    return results;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}

// Función que retorna los ejercicios por su Id.

async function getExerciseById(exercise_id) {
  let connection;
  try {
    connection = await getDb();
    const [result] = await connection.query(
      "SELECT * FROM exercises WHERE id = ?",
      [exercise_id]
    );
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}

// Función que retorna los ejercicios por su nombre.

async function getExerciseByName(name) {
  let connection;
  try {
    connection = await getDb();
    const [result] = await connection.query(
      "SELECT * FROM exercises WHERE name LIKE ?",
      [`%${name}%`]
    );
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}

// Función que retorna los ejercicios que un usuario a seleccionado en favoritos.

async function getFavoriteExercises(user_id) {
  let connection;
  try {
    connection = await getDb();
    const [result] = await connection.query(
      "SELECT e.* FROM exercises e JOIN favorites f ON e.id = f.exercise_id WHERE f.user_id = ?",
      [user_id]
    );
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}

// Función que retorna los ejercicios por el grupo muscular.

async function getExercisesByMuscleGroup(muscleGroup) {
  let connection;
  try {
    connection = await getDb();
    const [result] = await connection.query(
      "SELECT * FROM exercises WHERE muscleGroup = ?",
      [muscleGroup]
    );
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  getAllExercises,
  getExerciseById,
  getExerciseByName,
  getFavoriteExercises,
  getExercisesByMuscleGroup,
};
