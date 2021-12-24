const logger = require('./logger');

const requestLogger = (req, _res, next) => {
  logger.info(`${req.method} ${req.path}`, req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_req, res) => res.status(404).send({ error: 'unknown endpoint' });

const errorHandler = (err, _req, res, next) => {
  logger.error(err);
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: `malformed body. ${err}` });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  next(err);
};

module.exports = {
  requestLogger, unknownEndpoint, errorHandler,
};
