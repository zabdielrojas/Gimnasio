const getDb = require("../../db/getDb");

async function getExerciseInfo(req, res) {
  const {id:exercise_id} =req.query
  
  let connection;
  try {
    connection = await getDb();
    
    const [exercise] = await connection.query(
      "SELECT * FROM exercises WHERE id = ?",
      [exercise_id]
    );
    return res.status(200).json(exercise);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = getExerciseInfo;
