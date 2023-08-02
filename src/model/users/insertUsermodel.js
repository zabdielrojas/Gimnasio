// Importamos las dependencias.
const bcrypt = require('bcrypt');

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDB = require('./db/getDB');

// Importamos los errores.
const {
  userAlreadyRegisteredError,
  emailAlreadyRegisteredError,
} = require('../../services/errorService');

// Función que realiza una consulta a la base de datos para crear un nuevo usuario pendiente de activar.
const insertUserModel = async (email, username, password, registrationCode) => {
  let connection;

  try {
    connection = await getDB();

    // Comprobamos si el email está repetido.
    let [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    // Si el array de usuarios tiene más de 0 usuarios, el email está repetido.
    if (users.length > 0) {
      emailAlreadyRegisteredError();
    }

    // Comprobamos si el nombre de usuario está repetido.
    [users] = await connection.query(
      `SELECT id FROM users WHERE username = ?`,
      [username]
    );

    // Si el array de usuarios tiene más de 0 usuarios, el nombre de usuario está repetido.
    if (users.length > 0) {
      userAlreadyRegisteredError();
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario en la base de datos.
    await connection.query(
      `INSERT INTO users (email, username, password, registrationCode, createdAt) VALUES(?, ?, ?, ?, ?)`,
      [email, username, hashedPass, registrationCode, new Date()]
    );
  } catch (err) {
    console.error('Error al insertar el usuario:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserModel;
