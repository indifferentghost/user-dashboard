const express = require("express");
const isEmail = require('validator/lib/isEmail');
const User = require('../models/user');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!isEmail(email) || !password) {
    res.status(500).json({ error: "email must be an email." });
    return;
  }

  const hashedPassword = User.hashPassword(password);

  User.create({
    email,
    password: hashedPassword,
  });

  res.status(201);
});

module.exports = router;