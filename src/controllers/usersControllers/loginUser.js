// Importamos las dependencias.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  missingFieldsError,
  invalidCredentialsError,
  pendingActivationError,
} = require("../services/errorService");

// Función controladora que logea a un usuario retornando un token.
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // Si faltan campos requeridos, lanzamos un error.
      missingFieldsError();
    }
    // ❌HAY QUE CREAR 1 MODELO DE PRUEBA❌
    //Aqui va otro modelo este es un ejemplo
    // Buscamos al usuario por su email en la base de datos.
    const user = await loginUser(email);

    if (!user) {
      // Si el usuario no existe, lanzamos un error.
      invalidCredentialsError();
    }

    // Comprobamos si las contraseñas coinciden.
    const validPass = await bcrypt.compare(password, user.password);

    // Si no coinciden, lanzamos un error.
    if (!validPass) {
      invalidCredentialsError();
    }

    // Si la contraseña es correcta pero el usuario no está activo, lanzamos un error.
    if (!user.active) {
      pendingActivationError();
    }

    // Objeto con info que queremos agregar al token.
    const tokenInfo = {
      id: user.id,
      role: user.role,
    };

    // Creamos el token.
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
