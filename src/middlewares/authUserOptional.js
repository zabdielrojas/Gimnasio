// Importamos las dependencias.
const jwt = require("jsonwebtoken");

// Importamos los errores.
const { invalidCredentialsError } = require("../services/errorService");

// Función controladora intermedia que desencripta el token y crea la propiedad "req.user". Si no
// hay token NO lanza un error.
const authUserOptional = async (req, next) => {
  try {
    const { authorization } = req.headers;

    // Si hay token creamos la propiedad user en el objeto request. Cabe la posibilidad
    // de que recibamos un valor "null" como String por lo que evitaremos entrar en este
    // if si se da el caso.
    if (authorization && authorization !== "null") {
      // Variable que almacenará la info del token una vez desencriptada.
      let tokenInfo;

      try {
        tokenInfo = jwt.verify(authorization, process.env.SECRET);
      } catch {
        invalidCredentialsError();
      }

      req.user = tokenInfo;
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authUserOptional;
