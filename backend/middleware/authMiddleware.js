const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secreto_super_seguro';

const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Agregar datos del usuario a la solicitud
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = authenticate;