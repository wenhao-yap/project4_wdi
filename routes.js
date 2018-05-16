const product = require('./controllers/product');
const invoice = require('./controllers/invoice');
const users = require('./controllers/user');

function verifyToken(req,res,next){
	//get auth header value
	const bearerHeader = req.headers['authorization'];
	//check if bearer is undefined
	if(typeof bearerHeader !== 'undefined'){

	} else{
		//Forbidden
		res.status(403).json({failed:'Unauthorized Access'})
	}
}

module.exports = (app,db, request) => {
  app.get('/api/products', product.get(db));
  app.post('/api/products/new', product.create(db));
  app.post('/api/products/edit', product.edit(db));
  app.delete('/api/products/delete', product.remove(db));

  app.get('/api/invoices', invoice.get(db));
  app.post('/api/invoices/new', invoice.create(db));

  app.post('/api/users/new', users.create(db));
  app.post('/api/users/login', users.login(db));
};