// models/index.js

//  modelo de usuario (User).
const User = require("./user");

// función insertUserModel.
const insertUserModel = require("./insertUsermodel"); //

// función añadir un ejercicio
const insertExerciseModel = require("..addExercisesModel.js");
// función eliminar un ejercicio
const deleteExerciseModel = require("..deleteExercisesModel.js");

module.exports = {
  User,
  insertUserModel,
  insertExerciseModel,
  deleteExerciseModel,
  // Agregar otros modelos aquí cuando los tengais definidos. 🔴
};
