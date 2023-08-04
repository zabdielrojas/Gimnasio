require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");
const savePhotoService = require("../../services/savePhotoService");
// Importamos los modelos
//const insertExerciseModel = require("..addExercisesModel.js");
const insertExerciseModel = require("../../models/exercises/addExercisesModel");
const { missingFieldsError } = require("../../services/errorService");

// Función controladora  que crea un nuevo ejercicio desde administrador.
const addNewExercise = async (req, res, next) => {
  try {
    const { name, description, muscleGroup } = req.body;
    //console.log(name, description, muscleGroup);

    let photoName;
    if (req.files) {
      photoName = await savePhotoService(req.files.photo, 500);
    }

    // comprobar que tenemos los campos obligatorios
    if(!name || !photoName || !description || !muscleGroup){
      missingFieldsError();
    }

    // Registramos el entrenamiento.

    await insertExerciseModel({
      name,
      photoName,
      description,
      muscleGroup,
      user_id: req.user.id,
    });

    res.status(201).send({
      status: "ok",
      message: "Ejercicio creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addNewExercise;
getDb();
