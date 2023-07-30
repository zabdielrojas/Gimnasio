"use strict";

// Creamos el servidor.
const express = require("express");
const app = express();

app.get("/search", (req, res) => {
  console.log(req.query);
  res.end();
});
// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(8000, () => {
  console.log("Server listening at http://localhost:8000");
});

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
