const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const configs = require('./utils/config');
const logger = require('./utils/logger');
const { requestLogger, errorHandler, unknownEndpoint } = require('./utils/middleware');

const app = express();

logger.info('Connecting to MongoDB...');
mongoose
  .connect(configs.URL)
  .then(() => logger.info('Connection successful.'))
  .catch((error) => logger.error('Error connecting to Mongo:\n', error));

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(express.static('build'));

app.use('/api/login', loginRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
