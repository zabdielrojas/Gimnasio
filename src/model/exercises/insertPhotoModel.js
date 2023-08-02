// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDB = require("src/db/getDb.js");

// Función que realiza una consulta a la base de datos para agregar una foto a una entrada.
const insertPhotoModel = async (photoName, entryId) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    const [photo] = await connection.query(
      `INSERT INTO entryPhotos(name, entryId, createdAt) VALUES(?, ?, ?)`,
      [photoName, entryId, createdAt]
    );

    return {
      id: photo.insertId,
      name: photoName,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoModel;
