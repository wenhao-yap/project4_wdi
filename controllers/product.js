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
}

 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  get
} 