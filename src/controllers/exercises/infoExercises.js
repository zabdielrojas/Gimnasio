const getDb = require("../../db/getDb");

async function getExerciseInfo(id) {
  let connection;
  try {
    connection = await getDb();
    const [exercise] = await connection.query(
      "SELECT * FROM exercises WHERE id = ?",
      [id]
    );
    return exercise;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = getExerciseInfo;
