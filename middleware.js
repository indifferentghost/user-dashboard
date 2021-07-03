const express = require('express');
const cookieSession = require('cookie-session');
const { SESSION_SECRET } = process.env

module.exports = (server) => {
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(express.static('public'));

  server.set('view engine', 'ejs');
  server.locals.rmWhitespace = true;
  server.set('query parser', 'simple');

  server.use(cookieSession({
    secret: SESSION_SECRET,
    name: 'session', // req.session
    cookie: {
      secure: true,
      httpOnly: true, // this means that client-side javascript can't access this cookie
    },
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));
};
