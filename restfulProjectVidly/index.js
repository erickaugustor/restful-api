require('express-async-errors');

const winston = require('winston');
require('winston-mongodb');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require('mongoose');
const config = require('config');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

const error = require('./middleware/error');

const express = require('express');
const app = express();

process.on('uncaughtException', ex => {
  console.log('WE GOT AN UNCAUGHT EXCEPTION');
  winston.err(ex.message, ex);
});

process.on('unhandledRejection', ex => {
  console.log('WE GOT AN UNHANDLED REJECTION');
  winston.err(ex.message, ex);
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
  db: 'mongodb://localhost/vidly',
  leve: 'info',
});

const p = Promise.reject(new Error('Something failed miserably!'));
p.then(() => console.log('Done'));


if (!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));