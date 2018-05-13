module.exports = (dbPool) => {
	return{
    get: (callback) => {
      const queryString = 'SELECT * FROM invoices';
      dbPool.query(queryString, (error, queryResult) => {
        if(error) throw error;
        callback(error, queryResult);
      });
    },

    create: (newInvoice,callback) => {
      console.log(newInvoice);
      const queryString = 'INSERT INTO invoices (gross_amount,GST,discount,net_amount)\
      VALUES($1,$2,$3,$4) returning id'
  	  const values = [
        newInvoice.gross_amount,
        newInvoice.GST,
        newInvoice.discount,
        newInvoice.net_amount
  	  ];

      dbPool.query(queryString,values, (error, queryResult) => {
        if(error) throw error;

        let invoices_id = queryResult.rows[0].id;
        let secondQuery = 'INSERT INTO invoice_item (products_id,invoices_id,quantity,amount) VALUES ';
        let str = '';
        for(let item of newInvoice.items){
          str += '(' + item.product_id.toString() + ',' + invoices_id.toString() + ',' + item.quantity.toString() + ',' + item.amount.toString() + '),';
        }
        secondQuery = (secondQuery + str).replace(/.$/g, "");
        console.log(secondQuery);

        dbPool.query(secondQuery,(error,secondResult) => {
          callback(error, secondResult);
        })
      });	    	
    }
	}
}