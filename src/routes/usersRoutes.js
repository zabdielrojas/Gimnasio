const express = require("express");
const router = express.Router();

// Importamos las funciones controladoras requeridas.
const {
  createUser,
  loginUser,
  likeExercise,
  getPublicProfile,
} = require("../controllers/usersController");

// Ruta para registrar un nuevo usuario.
router.post("/register", createUser);

// Ruta para el login de un usuario.
router.post("/login", loginUser);

// Ruta para que un usuario dé like a un ejercicio.
router.post("/:userId/exercises/:exerciseId/like", likeExercise);

// Ruta para obtener el perfil público de un usuario.
router.get("/:userId", getPublicProfile);

module.exports = router;
