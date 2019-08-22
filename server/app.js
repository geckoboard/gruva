const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = parseInt(process.env.PORT, 10) || 8000;

// Setup environment variables
require('dotenv').config();

const createApp = () => {
  // Set up the express app
  const app = express();

  // Log requests to the console.
  app.use(logger('dev'));

  // Parse incoming requests data (https://github.com/expressjs/body-parser)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Set CORS headers
  app.use(cors());

  // Serve our static files
  app.use(express.static(__dirname + '/../client/dist'));

  // Require our routes into the application.
  require('./server/routes')(app);

  app.set('port', port);

  return app;
};

const start = () => {
  const app = createApp();
  const server = http.createServer(app);

  server.listen(app.get('port'));
};

module.exports = { start };
