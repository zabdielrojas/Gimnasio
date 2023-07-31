const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};

module.exports = authUser;
