require("dotenv").config();
const getDb = require("../../db/getDb");

async function filterExercises(options = {}) {
  let connection;
  try {
    connection = await getDb();
    let query = "SELECT * FROM exercises";
    let queryParams = [];
    if (options.exercise_id) {
      query += " WHERE id = ?";
      queryParams.push(options.exercise_id);
    } else if (options.name) {
      query += " WHERE name LIKE ?";
      queryParams.push(`%${options.name}%`);
    } else if (options.user_id) {
      query =
        "SELECT e.* FROM exercises e JOIN favorites f ON e.id = f.exercise_id WHERE f.user_id = ?";
      queryParams.push(options.user_id);
    } else if (options.muscleGroup) {
      query += " WHERE muscleGroup = ?";
      queryParams.push(options.muscleGroup);
    }
    const [result] = await connection.query(query, queryParams);
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = filterExercises;
