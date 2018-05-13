/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

const get = (db) => {
  return (request, response) => {
    db.invoice.get((error, queryResult) => {
    	response.send(queryResult.rows);
    })
	} 
};

const create = (db) => {
  return (request, response) => {
    db.invoice.create(request.body,(error, queryResult) => {
    	response.send(JSON.stringify(queryResult.rows));
    })
  }
};

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  get,
  create
} 