// Faltan las rutas

// Importamos los modelos
const insertExerciseModel = require("");

// Función controladora  que crea un nuevo ejercicio.
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
