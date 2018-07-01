const Joi = require('joi');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

// Debugging
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');

// Express 
const app = express();

app.set('view engine', 'pug'); // Express loading this module
app.set('views', './views');

// Configurations
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail server: ${config.get('mail.host')} \n`);
// console.log(`Mail password: ${config.get('mail.password')} \n`);

// Environments
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);   // undefined as default
console.log(`app: ${app.get('env')} \n`);              // development as default

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static('public'));               // read static files 
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  startupDebugger('Morgan is enabled... \n');
}

// Db work...
dbDebugger('Connected to the database...');

app.use(logger);

app.use((req, res, next) => {
  console.log('Authenticating...');
  next();
})

// Routes
app.get('/home/', (req, res) => {
  // res.send('Hello World!!!');
  res.render('index', { title: 'My Express App', message: 'Hello' });
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
