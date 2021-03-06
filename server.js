const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * ===================================
 * Routes
 * ===================================
 */

require('./routes')(app, db);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});