"use strict";

const express = require("express");

// Creamos el servidor.
const app = express();
// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(8000, () => {
  console.log("Server listening at http://localhost:8000");
});

//Importamos  Mysql
const mysql = require("mysql");
const conexion = mysql.createConnection({
  host: "localhost",
  database: "worksoutgym",
  User: "root",
  password: "123456",
});
conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conexión exitosa");
  }
});
conexion.end();

// Importamos y hacemos uso de "dotenv".
require("dotenv").config();
const getDb = require("./getDb");

const main = async () => {
  let connection;

  try {
    connection = await getDb();
    // Cerrar la conexión después de usarla
    connection.release();
  } catch (err) {
    console.error(err);
  }
};

main();
