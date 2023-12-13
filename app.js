const express = require('express')
const logger = require('morgan')
const cors = require('cors')

<<<<<<< HEAD
const contactsRouter = require('./routes');
=======
const contactsRouter = require('./routes/api/contacts')
>>>>>>> parent of ba59c45 (The main functionality is ready)

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

<<<<<<< HEAD
// Middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// Router
app.use('/api/contacts', contactsRouter);
// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Path Not found' });
});
// Global Errors
=======
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

>>>>>>> parent of ba59c45 (The main functionality is ready)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
