require("dotenv").config();

const getDb = require("./getDb");

const app = async () => {
  let connection;

  try {
    connection = await getDb();

    console.log("NOMBRE DB:", process.env.MYSQL_DATABASE);

    await connection.query(`USE ${process.env.MYSQL_DATABASE}`);

    // Borrar tablas si existen
    await connection.query("DROP TABLE IF EXISTS users");
    await connection.query("DROP TABLE IF EXISTS workers");
    await connection.query("DROP TABLE IF EXISTS exercises");

    console.log("Creando tablas...");

    // Tabla de usuarios.
    await connection.query(
      `
        CREATE TABLE users (
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL,
          name VARCHAR(30) NOT NULL,
          lastName VARCHAR(100),
          birthDate DATETIME,
          photo VARCHAR(100)
          role ENUM('admin', 'normal') DEFAULT 'normal',
          CRATE_AT
        )
      `
    );

    // Tabla de favoritos:
    // id
    // fk user
    // fk ejercicios
    // createat

    // Tabla de ejercicios.
    await connection.query(
      `
        CREATE TABLE exercises (
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(50),
          photo VARCHAR(100),
          description TEXT,
          muscleGroup ENUM('superior', 'inferior')
          FK usuario
          CREATE_AT
        )
      `
    );

    // Creo usuario admin (insert)
    //ADMIN_EMAIL
    //ADMIN_PWD
    //rol admin

    console.log("¡Tablas creadas!");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

// Llamamos a la función para crear las tablas.
app();
