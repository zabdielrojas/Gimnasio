require('dotenv').config();

const getDb = require('./getDb');

const main = async () => {
    let connection;

    try {
        connection = await getDb();

        console.log('Creando base de datos...');

        await connection.query('CREATE DATABASE IF NOT EXISTS web');
        await connection.query('USE web');

        console.log('Eliminando tablas existentes...');

        await connection.query('DROP TABLE IF EXISTS users, workers, exercises');

        console.log('Creando tablas...');

        // Tabla de usuarios.
        await connection.query(
            `
                CREATE TABLE users (
                    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    name VARCHAR(30) NOT NULL,
                    lastName VARCHAR(100),
                    birthDate DATETIME,
                    photo CHAR(100);
                    role ENUM;
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
                    name VARCHAR(30) NOT NULL,
                    lastName VARCHAR(100),
                    birthDate DATETIME,
                    photo CHAR(100);
                    admin ENUM;
                    likes JSON,
                    favoritesExcercises JSON,
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

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
};

// Llamamos a la función anterior.
main();
