const test = require('./controllers/test');

module.exports = (app) => {
  app.get('/api/hello', test.get);
};