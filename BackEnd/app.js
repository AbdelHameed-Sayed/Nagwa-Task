// require express and create server:
const express = require('express');
const server = express();

// require routes:
const wordsRoute = require('./routes/wordsRoute');
const rankRoute = require('./routes/rankRoute');

// Middlewares:

// To allow access:
const cors = require('cors');
server.use(cors());

//requset.body json middleware:
server.use(express.json());

// Words route:
server.use(wordsRoute);

// rank route:
server.use(rankRoute);

// Not found end point:
server.use((_, response) => {
  response.status(404).json({ message: 'Not found' });
});

// catch any errors:
server.use((error, _, response, next) => {
  response
    .status(error.status || 500)
    .json({ message: `Internal error: ${error}` });

  next();
});

// listen on port 8080;
let port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
