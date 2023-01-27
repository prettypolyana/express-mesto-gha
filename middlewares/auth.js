const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'c01f0f02282771cb642873775aff6a58d5bd9c452389f98c07c41e333b70b069');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
