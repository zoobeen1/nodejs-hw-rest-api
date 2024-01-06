const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const { httpError } = require('./utils');

const { contactsRouter, usersRouter } = require('./routes');

const app = express();
// MongoConnection
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('Database connection successful'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const formatsLogger =
  app.get('env') === 'development' ? 'dev' : 'short';

// Middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Router
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);
// Error 404
app.use((req, res, next) => {
  next(httpError(404, 'Wrong Path'));
});

// Global Errors handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
