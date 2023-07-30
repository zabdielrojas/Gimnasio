require("dotenv").config();

// // Importamos la función que nos permite obtener una conexión libre con la base de datos.

const getDb = require("./getDb");

const app = async () => {
  let connection;

  try {
    connection = await getDb();

    //await connection.query("CREATE DATABASE IF NOT EXISTS worksoutgym");
    //await connection.query("USE worksoutgym");


    console.log('Borrando tablas...');

    await connection.query('DROP TABLE IF EXISTS exercises');
    await connection.query('DROP TABLE IF EXISTS workers');
    await connection.query('DROP TABLE IF EXISTS entries');
    
   
    
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
                    photo VARCHAR(100),
                    likes JSON,
                    favoritesExcercises JSON
                )
            `
    );

    // Tabla de trabajadores.
    await connection.query(
      `
                CREATE TABLE workers (
                    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(100) NOT NULL,
                    name VARCHAR(30) NOT NULL,
                    lastName VARCHAR(100),
                    birthDate DATETIME,
                    photo VARCHAR(100),
                    role ENUM('admin', 'normal') DEFAULT 'normal',
                    likes JSON,
                    favoritesExcercises JSON,
                    active BOOLEAN DEFAULT false
                )
            `
    );

    // Tabla de ejercicios.
    await connection.query(
      `
                CREATE TABLE exercises (
                    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(50),
                    photo VARCHAR(100),
                    description TEXT,
                    muscleGroup VARCHAR(100)
                )
            `
    );

    console.log("¡Tablas creadas!");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

// Llamamos a la función anterior.
app();
