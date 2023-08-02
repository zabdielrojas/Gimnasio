// Importar el modelo de la base de datos para los ejercicios (si ya lo tienes definido)
// const Exercise = require('../models/exerciseModel');

// Controlador para obtener todos los ejercicios
exports.getAllExercises = async (req, res, next) => {
  try {
    // Aquí puedes usar el modelo de la base de datos para obtener todos los ejercicios
    // const exercises = await Exercise.find();

    // Simulamos datos de ejemplos
    const exercises = [
      {
        id: 1,
        name: "Ejercicio 1",
        description: "Descripción del ejercicio 1",
        musclegroup: "Grupo muscular 1",
        // ...
      },
      {
        id: 2,
        name: "Ejercicio 2",
        description: "Descripción del ejercicio 2",
        musclegroup: "Grupo muscular 2",
        // ...
      },
      {
        id: 3,
        name: "Ejercicio 3",
        description: "Descripción del ejercicio 3",
        musclegroup: "Grupo muscular 3",
        // ...
      },

      // ... Puedes agregar más ejercicios aquí
    ];

    res.status(200).json({ exercises });
  } catch (err) {
    next(err);
  }
};

// Controlador para obtener un ejercicio por su ID
exports.getExerciseById = async (req, res, next) => {
  try {
    const exerciseId = req.params.exerciseId;

    // Aquí puedes usar el modelo de la base de datos para obtener un ejercicio por su ID
    // const exercise = await Exercise.findById(exerciseId);

    // Simulamos datos de ejemplo
    const exercise = {
      id: exerciseId,
      name: "Ejercicio 1",
      description: "Descripción del ejercicio 1",
      musclegroup: "Grupo muscular 1",
      // ...
    };

    if (!exercise) {
      const error = new Error("Ejercicio no encontrado");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ exercise });
  } catch (err) {
    next(err);
  }
};

// Agrega más funciones controladoras según las necesidades de tu API

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(bodyParser.json());

// Lista para almacenar los ejercicios en memoria
let exercises = [
  { id: 1, nombre: 'Ejercicio 1', descripcion: 'Descripción del ejercicio 1', musclegroup: 'Grupo muscular 1' },
  { id: 2, nombre: 'Ejercicio 2', descripcion: 'Descripción del ejercicio 2', musclegroup: 'Grupo muscular 2' },
  { id: 3, nombre: 'Ejercicio 3', descripcion: 'Descripción del ejercicio 3', musclegroup: 'Grupo muscular 3' }
];

// Objeto para almacenar los likes en memoria
let likes = {};

// Ruta para obtener todos los ejercicios
app.get('/exercises', (req, res) => {
  res.json(ejercicios);
});

// Ruta para agregar un ejercicio
app.post('/exercises', (req, res) => {
  const { id, nombre, descripcion } = req.body;
  if (!id || !nombre || !descripcion) {
    return res.status(400).json({ mensaje: 'Se deben proporcionar todos los campos: id, nombre, descripcion' });
  }

  const nuevoEjercicio = { id, nombre, descripcion };
  exercises.push(nuevoEjercicio);
  res.json({ mensaje: 'Ejercicio agregado correctamente' });
});

// Ruta para dar un like a un ejercicio específico
app.post('/exercises/:id/like', (req, res) => {
  const ejercicioId = parseInt(req.params.id);

  if (isNaN(ejercicioId)) {
    return res.status(400).json({ mensaje: 'El id del ejercicio debe ser un número válido' });
  }

  if (!ejercicios.find(ejercicio => ejercicio.id === ejercicioId)) {
    return res.status(404).json({ mensaje: 'No se encontró el ejercicio con el id proporcionado' });
  }

  if (!likes[ejercicioId]) {
    likes[ejercicioId] = 0;
  }
  likes[ejercicioId]++;

  res.json({ mensaje: 'Like agregado correctamente' });
});

// Ruta para quitar un like de un ejercicio específico
app.delete('/exercises/:id/like', (req, res) => {
  const ejercicioId = parseInt(req.params.id);

  if (isNaN(ejercicioId)) {
    return res.status(400).json({ mensaje: 'El id del ejercicio debe ser un número válido' });
  }

  if (!exercises.find(ejercicio => ejercicio.id === ejercicioId)) {
    return res.status(404).json({ mensaje: 'No se encontró el ejercicio con el id proporcionado' });
  }

  if (likes[ejercicioId]) {
    likes[ejercicioId]--;
  }

  res.json({ mensaje: 'Like eliminado correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});


//Retornar información de un ejercicio (incluida la description).

const getAllExercises = (req, res) => {
  const id = parseInt(req.params.id);
  const exercises = exercises.find((e) => e.id === id);
  if (!exercises) return res.sendStatus(404);
  res.json(exercises);
};

//Retornar el listado del los ejercicios favoritos del usuario de token (TOKEN)

let ejercicios = [
  {
    id: 1,
    nombre: 'Ejercicio 1',
    descripcion: 'Descripción del ejercicio 1',
    foto: 'url_de_la_imagen',
    tipologia: 'Fuerza',
    grupoMuscular: 'Grupo muscular 1',
    likes: 0,
    favoritos: [] // Agregamos un array para almacenar los usuarios que lo han marcado como favorito
  },
  // Añade más ejercicios aquí
];

const obtenerEjerciciosFavoritos = (req, res) => {
  const userId = req.user.id;

  const ejerciciosFavoritos = ejercicios.filter(ejercicio => ejercicio.favoritos.includes(userId));
  
  res.json(ejerciciosFavoritos);
};

module.exports = {
  // ...
  seleccionarFavorito,
  filtrarEjercicios,
  obtenerEjerciciosFavoritos, // Agregamos esta función
};
