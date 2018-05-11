const product = require('./controllers/product');

module.exports = (app,db, request) => {
  app.get('/api/products', product.get(db));
};