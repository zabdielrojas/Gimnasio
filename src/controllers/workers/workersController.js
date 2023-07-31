const express = require("express");
const router = express.Router();
const { validateToken } = require("../../middlewares/authUser.js");

const {
  createWorker,
  loginWorker,
  uploadExercise,
  updateExercise,
  deleteExercise,
} = require("./workersController");

// Ruta para registrar un nuevo trabajador (usuario del gimnasio).
router.post("/register", createWorker);

// Ruta para el login de un trabajador.
router.post("/login", loginWorker);

// Ruta para que el administrador suba un nuevo ejercicio.
router.post("/admin/upload-exercise", validateToken, uploadExercise);

// Ruta para que el administrador actualice un ejercicio existente.
router.put("/admin/update-exercise/:exerciseId", validateToken, updateExercise);

// Ruta para que el administrador elimine un ejercicio.
router.delete(
  "/admin/delete-exercise/:exerciseId",
  validateToken,
  deleteExercise
);

module.exports = router;
