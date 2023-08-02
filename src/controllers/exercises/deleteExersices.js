require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("./getDb");

// Importamos los modelos
const deleteExerciseModel = require("");

// Función controladora que elimina un ejercicio.
const deleteExercise = async (req, res, next) => {
  try {
    const { id } = req.body;

    // Eliminamos el ejercicio.
    await deleteExerciseModel(id);

    res.send({
      status: "ok",
      message: "Ejercicio eliminado",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteExercise;

getDb();
