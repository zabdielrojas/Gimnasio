// Routes exercises
const express = require("express");
const router = express.Router();

const authUser = require("../middlewares/authUser");
const userExists = require("../middlewares/userExists");
const isAdmin = require("../middlewares/isAdmin");

// Rutas de usuarios

// Importamos las funciones controladoras requeridas.
const {
  loginUserController,
  registerController,
  getOwnUserController,
} = require("../controllers/usersControllers");

const { addNewExercise } = require("../controllers/exercises");

// Ruta para el login de un usuario.
router.post("/users/login", loginUserController);

// Ruta para registrar un nuevo usuario.
router.post("/users/register", registerController);

// Obtener perfil privado de un usuario.
router.get("/users", authUser, userExists, getOwnUserController);

// Nuevo ejercicio
router.post("/exercises", authUser, userExists, isAdmin, addNewExercise);

// Rutas ejercicios

// Importamos las funciones controladoras requeridas.
/*
const {
  addToFavorites,
  addNewExercise,
  deleteExercise,
  getExerciseById,
  getExerciseByName,
  getFavoriteExercises,
  getExercisesByMuscleGroup,
  getExerciseInfo,
  removeFromFavorites,
  getAllExercises,
} = require("src/controllers/exercises");

// ruta para que un usuario agregue un ejercicio a favoritos en la base de datos.
router.get("..addExercisesFavorite.js", addToFavorites);

// ruta para que un usuario agregue un ejercicio a favoritos en la base de datos.
router.get("..deleteExercisesFavorite.js", removeFromFavorites);

// ruta para que el administrador agregue un ejercicio a la base de datos.

router.post("..addNewExercises.js", addNewExercise);

// ruta para que el administrador elimine un ejercicio a la base de datos.

router.delete("..deleteExercises.js", deleteExercise);

// ruta para que un usuario busque un ejercicio por diferentes modos de filtrado en la base de datos.

router.get(
  "..filterExercises.js",
  getAllExercises,
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
*/

module.exports = router;
