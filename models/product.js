module.exports = (dbPool) => {
	return{
    get: (callback) => {
    	const queryString = 'SELECT * FROM products';
      dbPool.query(queryString, (error, queryResult) => {
        if(error) throw error;
        callback(error, queryResult);
      });
    },

    create: (newProduct,callback) => {
  	  const queryString = 'INSERT INTO products (name,description) VALUES ($1,$2)';
  	  const values = [
        newProduct.name,
        newProduct.description
  	  ];

      dbPool.query(queryString,values, (error, queryResult) => {
        if(error) throw error;
          callback(error, queryResult);
      });	    	
    },

    edit: (updateProduct,callback) => {
      const queryString = 'UPDATE products\
        Set name=$1,description=$2\
        WHERE id=$3';
      const values = [
        updateProduct.name,
        updateProduct.description,
        updateProduct.id
      ];

      dbPool.query(queryString,values, (error, queryResult) => {
        if(error) throw error;
          callback(error, queryResult);
      });   
    },

    remove: (deleteProduct, callback) => {
      const queryString = 'DELETE FROM products WHERE id=$1';
      const values = [id];
      dbPool.query(queryString,values, (error, queryResult) => {
        if(error) throw error;
          callback(error, queryResult);
      }); 
    }
	}
}