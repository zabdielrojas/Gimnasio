require("dotenv").config();

const getDb = require("./getDb");

const app = async () => {
  let connection;

  try {
    connection = await getDb();

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

    await connection.query(`
    CREATE TABLE favorites (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id INT UNSIGNED,
      exercise_id INT UNSIGNED,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (exercise_id) REFERENCES exercises(id),
      UNIQUE(user_id, exercise_id)
    )
  `);

    console.log("¡Tablas creadas!");

    // Creando usuario admin
    const { ADMIN_EMAIL, ADMIN_PWD } = process.env;

    await connection.query(
      "INSERT INTO users (email, password, userRole, name) VALUES (?, ?, ?, ?)",
      [ADMIN_EMAIL, ADMIN_PWD, "admin", "Administrador"]
    );

    console.log("Usuario administrador creado con éxito");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

app();
