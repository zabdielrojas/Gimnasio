// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDB = require("src/db/getDb.js");

// Función que realiza una consulta a la base de datos para eliminar una foto de una entrada.
const deletePhotoModel = async (photoId) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(`DELETE FROM entryPhotos WHERE id = ?`, [photoId]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePhotoModel;
