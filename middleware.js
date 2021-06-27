const express = require('express');

module.exports = (server) => {
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(express.static('public'));

  server.set('view engine', 'ejs');
  server.locals.rmWhitespace = true;
  server.set('query parser', 'simple');
};
