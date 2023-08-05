require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");
const deletePhotoService = require("../../services/deletePhotoService");
// Importamos los modelos
//const insertExerciseModel = require("..addExercisesModel.js");
const deleteExerciseModel = require("../../models/exercises/deleteExerciseModel");
const { missingFieldsError } = require("../../services/errorService");

// Función controladora  que crea un nuevo ejercicio desde administrador.
const deleteExercise = async (req, res, next) => {
  try {
    const { name, description, muscleGroup } = req.body;

    console.log(name, description, muscleGroup);

    let photoName;
    if (req.files) {
      photoName = await deletePhotoService(req.files.photo, 500);
    }

    // comprobar que tenemos los campos obligatorios
    if (!name || !photoName || !description || !muscleGroup) {
      missingFieldsError();
    }

    // Eliminamos el entrenamiento.

    await deleteExerciseModel({
      name,
      photoName,
      description,
      muscleGroup,
      user_id: req.user.id,
    });

    res.status(201).send({
      status: "ok",
      message: "Ejercicio eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteExercise;
getDb();
