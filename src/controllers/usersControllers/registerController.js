// Importamos los modelos.
const insertUserModel = require("../../models/users/insertUserModel");

const { missingFieldsError } = require("../../services/errorService");

const newUserController = async (req, res, next) => {
  try {
    // Obtenemos los datos necesarios del body.
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      missingFieldsError();
    }

    // Insertamos el usuario.
    await insertUserModel(name, email, password);

    res.send({
      status: "ok",
      message: "Usuario creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUserController;
