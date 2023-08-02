require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("./getDb");

async function main() {
  // Creando los ejercicios
  const exercises = [
    [
      "sentadilla",
      "consiste en flexionar las rodillas y bajar el cuerpo manteniendo la verticalidad, para luego regresar a una posición erguida.",
      "inferior",
    ],
    [
      "press de banca",
      "Este ejercicio conlleva un movimiento de empuje con las piernas apoyadas en el suelo y la espalda y el tren superior sobre una superficie plana.",
      "superior",
    ],
    [
      "curl de bíceps",
      "Ejercicio para fortalecer los músculos del bíceps",
      "superior",
    ],
    [
      "zancada",
      "Ejercicio para fortalecer los músculos de las piernas y glúteos",
      "inferior",
    ],
    [
      "remo con barra",
      "Ejercicio para fortalecer los músculos de la espalda y bíceps",
      "superior",
    ],
    [
      "elevación lateral de hombros",
      "Ejercicio para fortalecer los músculos del hombro",
      "superior",
    ],
    [
      "abdominales",
      "Ejercicio para fortalecer los músculos abdominales",
      "superior",
    ],
  ];

  const values = exercises
    .map((exercise) => `('${exercise[0]}', '${exercise[1]}', '${exercise[2]}')`)
    .join(", ");

  let connection;
  try {
    connection = await getDb();
    await connection.query(
      `INSERT INTO exercises (name, description, muscleGroup) VALUES ${values}`
    );
  } finally {
    if (connection) connection.release();
  }

  console.log("Ejercicios agregados con éxito");
}

main();
