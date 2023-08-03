require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("./getDb");
// Importamos los modelos
const insertExerciseModel = require("..addExercisesModel.js");

// Función controladora  que crea un nuevo ejercicio desde administrador.
const addNewExercise = async (req, res, next) => {
  try {
    const { name, photo, description, muscleGroup } = req.body;

    // Registramos el entrenamiento.
    await insertExerciseModel({
      name,
      photo,
      description,
      muscleGroup,
    });

    res.send({
      status: "ok",
      message: "Ejercicio creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addNewExercise;
getDb();
