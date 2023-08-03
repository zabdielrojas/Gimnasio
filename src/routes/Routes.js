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
const {
  addToFavorites,
  addNewExercise,
  deleteExercise,
  getExerciseById,
  getExerciseByName,
  getFavoriteExercises,
  getExercisesByMuscleGroup,
} = require("src/controllers/exercises");

router.post("..addExercisesFavorite.js", addToFavorites);
router.post("..addNewExercises.js", addNewExercise);
router.post("..deleteExercises.js", deleteExercise);

router.post(
  "..filterExercises.js",
  getExerciseById,
  getExerciseByName,
  getFavoriteExercises,
  getExercisesByMuscleGroup
);

module.exports = router;
