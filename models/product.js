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
  	  const queryString = 'INSERT INTO products (name,brand,description,price,quantity) VALUES ($1,$2,$3,$4,$5)';
  	  const values = [
        newProduct.name,
        newProduct.brand,
        newProduct.description,
        newProduct.price,
        newProduct.quantity
  	  ];

      dbPool.query(queryString,values, (error, queryResult) => {
        if(error) throw error;
          callback(error, queryResult);
      });	    	
    },

    edit: (updateProduct,callback) => {
      const queryString = 'UPDATE products\
        Set name=$1,brand=$2,description=$3,price=$4,quantity=$5\
        WHERE id=$6';
      const values = [
        updateProduct.name,
        updateProduct.brand,
        updateProduct.description,
        updateProduct.price,
        updateProduct.quantity,
        updateProduct.id
      ];

      dbPool.query(queryString,values, (error, queryResult) => {
        if(error) throw error;
          callback(error, queryResult);
      });   
    },

    remove: (data, callback) => {
      let queryString = 'DELETE FROM products WHERE id in (';
      for(let i=0;i<data.length;i++){
        queryString += data[i] + ',' 
      }
      queryString = queryString.replace(/.$/g, ")");
      if(data.length === 1){
        queryString = 'DELETE FROM products where id = ' + data[0];
      }
      dbPool.query(queryString, (error, queryResult) => {
        if(error) throw error;
          callback(error, queryResult);
      }); 
    }
	}
}