require('dotenv').config();

const express = require('express');
const mainRouter = require('./routes/main');
const authRouter = require('./routes/auth');
const initMiddleware = require('./middleware');
const db = require('./db');

const PORT = process.env.PORT || 3000;

const server = express();

initMiddleware(server);

db();

server.use(mainRouter);
server.use(authRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});