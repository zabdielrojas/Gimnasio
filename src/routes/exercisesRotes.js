const express = require("express");
const router = express.Router();

// Importamos las funciones controladoras requeridas.
const {
  getAllExercises,
  getExerciseById,
  filterExercises,
} = require("../controllers/exercisesController");

// Ruta para obtener el listado de todos los ejercicios.
router.get("/", getAllExercises);

// Ruta para obtener información de un ejercicio por su ID.
router.get("/:exerciseId", getExerciseById);

// Ruta para filtrar ejercicios por grupo muscular.
router.get("/filter", filterExercises);

// Ruta para añadir un entrenamiento

// Ruta para borrar un entrenamiento

module.exports = router;

// Importamos las rutas.
//const exerciseController = require("./controllers/exercises/exercisesController");
//const userController = require("./userController");

// Configuración de las rutas.
// app.get('/exercises', exerciseController.getAllExercises);
// app.get('/exercises/:exerciseId', exerciseController.getExerciseById);
// app.post('/exercises/:id/like', exerciseController.seleccionarFavorito);
// app.get('/favoritos', userController.obtenerEjerciciosFavoritos);
