// models/index.js

//  modelo de usuario (User).
const User = require('./user');

// función insertUserModel.
const insertUserModel = require('./insertUsermodel'); // 

module.exports = {
  User,
  insertUserModel,
  // Agregar otros modelos aquí cuando los tengais definidos. 🔴
};
