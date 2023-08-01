require("dotenv").config();

const getDb = require("./getDb");

const app = async () => {
  let connection;

  try {
    connection = await getDb();

    console.log("NOMBRE DB:", process.env.MYSQL_DATABASE);

    await connection.query(`USE ${process.env.MYSQL_DATABASE}`);

    // Borrar tablas si existen
    await connection.query("DROP TABLE IF EXISTS exercises");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("Creando tablas...");

    // Tabla de usuarios.
    await connection.query(`
      CREATE TABLE users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        name VARCHAR(30) NOT NULL,
        lastName VARCHAR(100),
        birthDate DATETIME,
        photo VARCHAR(100),
        userRole ENUM('admin', 'cliente') DEFAULT 'cliente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Creaundo usuario admin

    const email = "admin@example.com";
    const password = "contraseña_segura";
    const userRole = "admin";
    const name = "Nombre del administrador";

    await connection.query(
      "INSERT INTO users (email, password, userRole, name) VALUES (?, ?, ?, ?)",
      [email, password, userRole, name]
    );

    console.log("Usuario administrador creado con éxito");

    // Tabla de ejercicios.
    await connection.query(`
      CREATE TABLE exercises (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        photo VARCHAR(100),
        description TEXT,
        muscleGroup ENUM('superior', 'inferior'),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INT UNSIGNED,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log("¡Tablas creadas!");

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
      .map(
        (exercise) => `('${exercise[0]}', '${exercise[1]}', '${exercise[2]}')`
      )
      .join(", ");

    await connection.query(
      `INSERT INTO exercises (name, description, muscleGroup) VALUES ${values}`
    );

    console.log("Ejercicios agregados con éxito");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

const insertTrainings = async (trainings) => {
  let connection;

  try {
    connection = await getDb();

    await connection.query(`USE ${process.env.MYSQL_DATABASE}`);

    // Recorrer el array de entrenamientos
    for (let training of trainings) {
      const [name, description, muscleGroup] = training;

      // Insertar el entrenamiento en la tabla de ejercicios
      await connection.query(
        "INSERT INTO exercises (name, description, muscleGroup) VALUES (?, ?, ?)",
        [name, description, muscleGroup]
      );
    }

    console.log("Entrenamientos insertados con éxito");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};
//Finalmente, puedes llamar a esta función pasándole el array de entrenamientos que quieres insertar:
const trainings = [
  ["sentadilla", "consiste en flexionar las rodillas y bajar el cuerpo manteniendo la verticalidad, para luego regresar a una posición erguida. 1", "inferior"],
  ["press de banca", "Este ejercicio conlleva un movimiento de empuje con las piernas apoyadas en el suelo y la espalda y el tren superior sobre una superficie planao 2", "superior"],
  ["curl de bíceps", "Ejercicio para fortalecer los músculos del bíceps","superior 3", ],
  [ "zancada", "Ejercicio para fortalecer los músculos de las piernas y glúteos 4","inferior", ],
  [ "remo con barra", "Ejercicio para fortalecer los músculos de la espalda y bíceps 5", "superior",],
  ["elevación lateral de hombros", "Ejercicio para fortalecer los músculos del hombro 6", "superior",],
  [ "abdominales", "Ejercicio para fortalecer los músculos abdominales 7", "superior",],
  // Agrega más entrenamientos aquí si es necesario
];

insertTrainings(trainings);

