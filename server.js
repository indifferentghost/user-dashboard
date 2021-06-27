const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const page = req.url;
  if (req.method.toLowerCase() === 'get') {
    if (page == '/') {
      res.write(fs.readFileSync(`./index.html`));
    } else if (page === '/test') {
      // somehow get title
      const title = 'test';
      const body = 'body';
      res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body>
        <h1>${body}</h1>
      </body>
      </html>
      `);
    } else {
      res.writeHead(404, 'file not found');
    }
  }
  
  res.end();
});

server.listen(PORT);