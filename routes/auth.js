const express = require("express");
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const User = require('../models/user');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log(req);
  if (!isEmail(email) || !password) {
    res.status(500).json({ error: "email must be an email." });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  User.create({
    email,
    password: hashedPassword,
  });

  res.status(201);
});

module.exports = router;