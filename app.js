const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const { HttpError } = require('./utils');

const contactsRouter = require('./routes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// Router
app.use('/api/contacts', contactsRouter);
// 404
// app.use((req, res) => {
//   res.status(404).json({ message: 'Path Not found' });
// });
// app.use((req, res, next) => {
//   next(createError(404));
// });
app.use((req, res, next) => {
  next(new HttpError(404, 'Wrong Path'));
});
// Global Errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
