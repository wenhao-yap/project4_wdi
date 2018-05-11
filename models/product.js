module.exports = (dbPool) => {
	return{
	    get: (callback) => {
	      	const queryString = "SELECT * FROM products";
	        dbPool.query(queryString, (error, queryResult) => {
	          callback(error, queryResult);
	        });
	    }
	}
}