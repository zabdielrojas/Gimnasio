const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto_de_tu_app'); // Reemplaza 'secreto_de_tu_app' con tu propio secreto.

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = {
  validateToken,
};
