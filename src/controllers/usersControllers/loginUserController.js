// Importamos las dependencias.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Importamos los modelos.
const selectUserByEmailModel = require("../../models/users/selectUserByEmailModel");

// Importamos los errores.
const {
  invalidCredentialsError,
  missingFieldsError,
} = require("../../services/errorService");

// Función controladora final que logea a un usuario retornando un token.
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
      missingFieldsError();
    }

    // Seleccionamos los datos del usuario que necesitamos utilizando el email.
    const user = await selectUserByEmailModel(email);

    // Comprobamos si la contraseña es válida.
    const validPass = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden lanzamos un error.
    if (!validPass) {
      invalidCredentialsError();
    }

    // Objeto con la información que queremos almacenar en el token.
    const tokenInfo = {
      id: user.id,
      role: user.userRole,
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
    console.log("ERROR!!!");
    next(err);
  }
};

module.exports = loginUserController;
