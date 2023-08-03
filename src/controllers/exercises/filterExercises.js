require("dotenv").config();

const getDb = require("./getDb");

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
  getExerciseById,
  getExerciseByName,
  getFavoriteExercises,
  getExercisesByMuscleGroup,
};
