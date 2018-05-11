/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

const get = (db) => {
  return (request, response) => {
    db.product.get((error, queryResult) => {
    	response.send(queryResult.rows);
    })
	} 
};

const create = (db) => {
  return (request, response) => {
    console.log(request.body);
    db.product.create(request.body,(error, queryResult) => {
    	response.send(JSON.stringify(queryResult.rows));
    })
  }
};

const edit = (db) => {
  return (request, response) => {
    console.log(request.body);
    db.product.edit(request.body,(error, queryResult) => {
      response.send(JSON.stringify(queryResult.rows));
    })
  }
};

const remove = (db) => {
  return (request, response) => {
    db.product.remove(request.params.id, (error, queryResult) => {
      response.send(JSON.stringify(queryResult.rows));
    });
  };
};

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  get,
  create,
  edit,
  remove
} 