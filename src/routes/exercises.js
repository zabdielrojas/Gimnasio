const express = require('express');
const router = express.Router();

// Importamos las funciones controladoras requeridas.
const { getAllExercises, getExerciseById, filterExercises } = require('../controllers/exercisesController');

// Ruta para obtener el listado de todos los ejercicios.
router.get('/', getAllExercises);

// Ruta para obtener información de un ejercicio por su ID.
router.get('/:exerciseId', getExerciseById);

// Ruta para filtrar ejercicios por grupo muscular.
router.get('/filter', filterExercises);

module.exports = router;
