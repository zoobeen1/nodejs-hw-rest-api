const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// Error handlers variant
const createError = require('http-errors');

const contactsRouter = require('./routes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// Router
app.use('/api/contacts', contactsRouter);
// Error 404 - variants
// With createError package
app.use((req, res, next) => {
  next(createError(404, 'Wrong Path'));
});
// With custom metod
// app.use((req, res, next) => {
//   next(new HttpError(404, 'Wrong Path'));
// });

// Global Errors handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
