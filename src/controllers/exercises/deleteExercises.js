require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");

// Importamos los modelos
const deleteExerciseModel = require("../../models/exercises/deleteExerciseModel");
const { missingFieldsError } = require("../../services/errorService");

const getExerciseByIdModel = require("../../models/exercises/getExerciseByIdModel");
// Función controladora que elimina un ejercicio desde el administrador.
const deleteExercise = async (req, res, next) => {
  try {
    // Check if the user is an administrator
    if (!req.user || !req.user.isAdmin) {
      throw new Error("Solo el administrador puede borrar un ejercicio");
    }
    const { id } = req.params;
    // Check if the exercise exists
    const exercise = await getExerciseByIdModel(id);
    if (!exercise) {
      missingFieldsError();
    }
    // Delete the exercise
    await deleteExerciseModel(id);
    res.status(200).send({
      status: "ok",
      message: "Ejercicio borrado.",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteExercise;

getDb();
