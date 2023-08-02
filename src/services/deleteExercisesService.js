// Faltan las rutas

// Función controladora final que borra un entrenamiento.
const deleteExercise = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Borramos el ejercicio.
    await deleteExercise(id);

    res.send({
      status: "ok",
      message: "Entrenamiento borrado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteExercise;
