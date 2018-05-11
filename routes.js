const product = require('./controllers/product');

module.exports = (app,db, request) => {
  app.get('/api/products', product.get(db));
  app.post('/api/products/new', product.create(db));
  app.post('/api/products/edit', product.edit(db));
};