const pg = require('pg');
const product = require('./models/product');
const invoice = require('./models/invoice');
const user = require('./models/user');

/**
 * ===================================
 * Deployment here??
 * ===================================
 */
const url = require('url');
let configs = {
  host: '127.0.0.1',
  database: 'wdi4',
  port: 5432  
};

const pool = new pg.Pool(configs);

pool.on('error', (err) => {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  pool: pool,
  product: product(pool),
  invoice: invoice(pool),
  user: user(pool)
};