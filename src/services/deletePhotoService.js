// Importamos las dependencias.
const fs = require("fs/promises");
const path = require("path");

// Importamos los errores.
const { deleteFileError } = require("./errorService");
const UPLOADS_DIR = path.join(__dirname, "./uploads");

const deletePhotoService = async (imgName) => {
  try {
    // Ruta absoluta al archivo que queremos elimiar.
    const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);

    try {
      await fs.access(imgPath);
    } catch {
      // Si no existe el archivo finalizamos la función.
      return;
    }

    // Eliminamos el archivo de la carpeta de uploads.
    await fs.unlink(imgPath);
  } catch (err) {
    console.error(err);
    deleteFileError();
  }
};

module.exports = deletePhotoService;

// falta definir UPLOADS_DIR
