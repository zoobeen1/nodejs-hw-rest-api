const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');
// Error handlers variant
const createError = require('http-errors');

const contactsRouter = require('./routes');
const { collection } = require('./models/contactsModels');

const app = express();
// MongoConnection
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('Database connection successful'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// Router
app.use('/api/contacts', contactsRouter);
// Error 404 - variant
app.use((req, res, next) => {
  next(createError(404, 'Wrong Path'));
});

// Global Errors handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
