const getDb = require("./getDb");

async function getExerciseInfo(exerciseId) {
  let connection;
  try {
    connection = await getDb();
    const [exercise] = await connection.query(
      "SELECT * FROM exercises WHERE id = ?",
      [exerciseId]
    );
    return exercise;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = getExerciseInfo;
