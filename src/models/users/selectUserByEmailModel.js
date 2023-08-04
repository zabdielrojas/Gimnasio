// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require("../../db/getDb");

// Importamos los errores.
const { invalidCredentialsError } = require("../../services/errorService");

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un email dado.
const selectUserByEmailModel = async (email) => {
  let connection;

  try {
    connection = await getDb();

    // Comprobamos si hay algún usuario con el email proporcionado.
    const [users] = await connection.query(
      `SELECT id, password, userRole FROM users WHERE email = ?`,
      [email]
    );

    // Si no existe un usuario con ese email lanzamos un error.
    if (users.length < 1) {
      invalidCredentialsError();
    }

    // El array de usuarios solo podrá contener un único usuario dado que el email
    // no puede repetirse. Retornamos al usuario que se encuentra en la posición 0,
    // es decir, retornamos el objeto en lugar de retornar un array con un elemento.
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailModel;
