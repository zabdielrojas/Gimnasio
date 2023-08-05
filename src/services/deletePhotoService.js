// Importamos las dependencias.
const fs = require("fs/promises");
const path = require("path");

// Importamos los errores.
const { deleteFileError } = require("./errorService");

const deletePhotoService = async (img) => {
  try {
    // Ruta absoluta al directorio de subida de archivos.
    const uploadsDir = path.join(
      __dirname,
      "..",
      "..",
      process.env.UPLOADS_DIR
    );

    // Ruta absoluta a la imagen.
    const imgPath = path.join(uploadsDir, img);

    // Eliminamos la imagen de la carpeta de subida de archivos.
    await fs.unlink(imgPath);
  } catch (err) {
    deleteFileError();
  }
};

module.exports = deletePhotoService;
