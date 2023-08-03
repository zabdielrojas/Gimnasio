// Routes exercises
const express = require("express");
const router = express.Router();

// Rutas de usuarios

// Importamos las funciones controladoras requeridas.
const { registerUser, loginUser } = require("../controllers/usersController");

// Ruta para registrar un nuevo usuario.
router.post("/register", registerUser);

// Ruta para el login de un usuario.
router.post("/login", loginUser);

// Rutas ejercicios

// Importamos las funciones controladoras requeridas.
const {
  addToFavorites,
  addNewExercise,
  deleteExercise,
  getExerciseById,
  getExerciseByName,
  getFavoriteExercises,
  getExercisesByMuscleGroup,
  getExerciseInfo,
} = require("src/controllers/exercises");

// ruta para que un usuario agregue un ejercicio a favoritos en la base de datos.
router.get("..addExercisesFavorite.js", addToFavorites);

// ruta para que el administrador agregue un ejercicio a la base de datos.

router.post("..addNewExercises.js", addNewExercise);

// ruta para que el administrador elimine un ejercicio a la base de datos.

router.delete("..deleteExercises.js", deleteExercise);

// ruta para que un usuario busque un ejercicio por diferentes modos de filtrado en la base de datos.

router.get(
  "..filterExercises.js",
  getExerciseById,
  getExerciseByName,
  getFavoriteExercises,
  getExercisesByMuscleGroup
);

// Ruta que devuelve la información de un ejercicio

router.get("..filterExercises.js", getExerciseInfo);

// Importamos las funciones controladoras requeridas.

const {
  addExercisesModel,
  deleteExerciseModel,
} = require("srcmodel\\exercises");

// Ruta que agrega los primeros ejercicios a la base de datos.
router.post("..addExercisesModel.js", addExercisesModel);

// Ruta que elimina ejercicios directamente en la base de datos.

router.delete("..deleteExercisesModel.js", deleteExerciseModel);

module.exports = router;
