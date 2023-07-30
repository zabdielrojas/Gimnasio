// Este es un ejemplo simple de middleware para validar un token de autenticación.

// Importamos la librería 'jsonwebtoken' para manejar los tokens.
const jwt = require('jsonwebtoken');

// Función de middleware para validar el token.
const validateToken = (req, res, next) => {
  // Obtenemos el token del encabezado de la solicitud.
  const token = req.header('Authorization');

  // Verificamos si el token existe.
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    // Verificamos y descodificamos el token.
    const decoded = jwt.verify(token, 'secreto_de_tu_app'); // Aquí debes usar el mismo secreto que se usó para firmar el token.

    // Si el token es válido, añadimos el objeto decodificado al objeto request.
    req.user = decoded;

    // Pasamos al siguiente middleware o ruta.
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = {
  validateToken,
};
