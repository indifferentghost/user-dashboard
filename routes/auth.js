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

router.get('/signin', (req, res) => {
  // TODO: If signed in redirect to dashboard
  res.render('signin');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    // TODO: flash error message
    res.status(401).json({ error: "No user found, or password incorrect" });
    return;
  }

  // if you were sending the user to the client as an API,
  // you should omit the following
  // ^^^^ this doesn't matter Server-side rendering like EJS
  // version key: __v, password, timestamps

  const passwordsMatch = user.comparePasswords(password);

  if (!passwordsMatch) {
    res.status(401).json({ error: "No user found, or password incorrect" });
    return;
  }

  req.session.user = user.email;

  res.redirect('/dashboard');
});

router.get('/signout', async (req, res) => {
  req.session = null;
  res.redirect('/signin');
});

module.exports = router;