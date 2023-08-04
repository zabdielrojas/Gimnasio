// Importamos las dependencias.
const bcrypt = require("bcrypt");

// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require("../../db/getDb");

// Importamos los errores.
const {
  emailAlreadyRegisteredError,
  userAlreadyRegisteredError,
} = require("../../services/errorService");

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
const insertUserModel = async (name, email, password) => {
  let connection;

  try {
    connection = await getDb();

    // Buscamos en la base de datos algún usuario con ese nombre.
    let [users] = await connection.query(
      `SELECT id FROM users WHERE name = ?`,
      [name]
    );

    // Si existe algún usuario con ese nombre lanzamos un error.
    if (users.length > 0) {
      emailAlreadyRegisteredError();
    }

    // Buscamos en la base de datos algún usuario con ese email.
    [users] = await connection.query(`SELECT id FROM users WHERE email = ?`, [
      email,
    ]);

    // Si existe algún usuario con ese email lanzamos un error.
    if (users.length > 0) {
      userAlreadyRegisteredError();
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario.
    await connection.query(
      `INSERT INTO users(name, email, password) VALUES( ?, ?, ?)`,
      [name, email, hashedPass]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserModel;
