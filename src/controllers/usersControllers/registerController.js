// Importamos las dependencias.
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { missingFieldsError } = require('../services/errorService');

// Función controladora para registrar un nuevo usuario.
const registerUser = async (req, res) => {
  try {
    const { email, firstName, lastName, birthDate, role, password, photo } = req.body;

    if (!email || !firstName || !lastName || !birthDate || !role || !password || !photo) {
      // Si faltan campos requeridos, lanzamos un error.
      missingFieldsError();
    }

    // Verificar si el correo electrónico ya está registrado en la base de datos.
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos.
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      birthDate,
      role,
      password: hashedPassword,
      photo,
    });

    // Respuesta con el usuario registrado.
    return res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ message: 'Error en el servidor al registrar el usuario.' });
  }
};

// Exportamos la función controladora registerUser.
module.exports = registerUser;
