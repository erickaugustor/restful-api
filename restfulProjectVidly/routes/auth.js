const {User} = require('../models/user');

const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const _ = require('lodash');
const config = require('config');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');


  const token = user.generateAuthToken();

  // JSON Web Tokens
  // config.get() === environment variables
  // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey') );
  
  res.send(token);
});

// Information Expert Principle



function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;

