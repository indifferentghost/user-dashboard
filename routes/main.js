const express = require("express");
const User = require('../models/user');

const router = express.Router();

async function validateUserSession(req, res, next) {
  const email = req.session.user
  if (!email) {
    res.redirect('/dashboard');
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.redirect('/dashboard');
  }
  req.user = user;
  next();
}

router.get("/", (req, res) => {
  res.render("index");
});

const JSON = {
  name: "100Devs",
  address: "remote",
  type: "school",
};

router.get("/choose", (req, res) => {
  console.log(req.headers.accept);
  const isJSONRequest = req.headers.accept.includes("application/json");
  if (isJSONRequest) {
    res.json(JSON);
    return;
  }
  res.render("choose", JSON);
});

router.get('/settings', (req, res) => {
  res.json({ settings: req.session.settings });
});

router.post('/settings', (req, res) => {
  req.session.settings = req.body;
  res.status(200).end();
})

router.get('/dashboard', validateUserSession, (req, res) => {
  // TODO: middleware validate that user email exists
  // TODO: render user email
  console.log(req.user, req.session.user)
  res.render('dashboard', { user: req.user });
});

router.get((req, res) => {
  res.status(404);
});

module.exports = router;
