const express = require('express');
const mainRouter = require('./routes/main');
const initMiddleware = require('./middleware')

const PORT = process.env.PORT || 3000;

const server = express();

initMiddleware(server);

server.use(mainRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});