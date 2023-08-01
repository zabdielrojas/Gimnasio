// Importamos las dependencias necesarias.
require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");

// Creamos el servidor.
const app = express();

// Middleware que deserializa un body en formato raw creando la propiedad body
// en el objeto request.
app.use(express.json());

// Middleware que deserializa un body en formato form-data creando la propiedad body
// en el objeto request y, si hay algún archivo, la propiedad files.
app.use(fileUpload());

// Middleware que muestra información sobre la petición entrante.
app.use(morgan("dev"));

// Middleware que evita problemas con las CORS cuando intentamos conectar el cliente con
// el servidor.
app.use(cors());

// Middleware que indica al servidor cuál es el directorio de ficheros estáticos.
app.use(express.static(process.env.UPLOADS_DIR));

// Importamos las rutas.
//const usersRouter = require("./src/routes/users");
//const exercisesRouter = require("./src/routes/exercises");

// Configuración de las rutas.
//app.use("/api/users", usersRouter);
//app.use("/api/exercises", exercisesRouter);

// Middleware de error para rutas no encontradas.
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Middleware de error para otros errores.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Ponemos el servidor a escuchar peticiones en un puerto dado.
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
