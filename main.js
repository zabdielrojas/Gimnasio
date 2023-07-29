"use strict";

// Importamos y hacemos uso de "dotenv".
require('dotenv').config();
const getDb = require('./getDb');


const main = async () => {
  let connection;

  try {
    connection = await getDb();

    // Realizar consultas o operaciones en la base de datos aquí


    // Cerrar la conexión después de usarla
    connection.release();
  } catch (err) {
    console.error(err);
  }
};

main();
