const logger = require('./logger');

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
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

  next(err);
};

module.exports = {
  requestLogger, unknownEndpoint, errorHandler,
};
