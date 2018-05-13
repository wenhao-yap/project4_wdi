const product = require('./controllers/product');
const invoice = require('./controllers/invoice');

module.exports = (app,db, request) => {
  app.get('/api/products', product.get(db));
  app.post('/api/products/new', product.create(db));
  app.post('/api/products/edit', product.edit(db));
  app.delete('/api/products/delete', product.remove(db));

  app.get('/api/invoices', invoice.get(db));
  app.post('/api/invoices/new', invoice.create(db));
};