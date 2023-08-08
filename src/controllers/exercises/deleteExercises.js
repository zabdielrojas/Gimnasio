require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");
// Importamos el modelo necesario.
const deleteExerciseModel = require("../../models/exercises/deleteExerciseModel");

// Función controladora  que elimina un ejercicio desde el id del ejercicio.
const deleteExercise = async (req, res, next) => {
  let connection
  try {
     connection = await getDb()
    const { id } = req.body;

    // Comprobar si el usuario tiene un rol de administrador
    if (req.user.role !== "admin") {
      return res.status(403).send({
        status: "error",
        message: "No tienes permiso para realizar esta acción",
      });
    }
    //Eliminar los likes del ejercicio
     await connection.query("DELETE FROM favorites WHERE exercise_id = ?",[id]);
    // Eliminar el ejercicio por su ID
    await deleteExerciseModel(id);

    res.status(200).send({
      status: "ok",
      message: "Ejercicio eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteExercise;
getDb();
