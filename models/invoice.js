module.exports = (dbPool) => {
	return{
    get: (callback) => {
      const queryString = 'SELECT invoices.id,invoices.gross_amount,invoices.gst,invoices.discount,invoices.net_amount,invoices.created_date, products.name, invoice_item.quantity\
        FROM ((invoice_item\
        INNER JOIN invoices ON invoice_item.invoices_id = invoices.id)\
        INNER JOIN products ON invoice_item.products_id = products.id)';
      dbPool.query(queryString, (error, queryResult) => {
        if(error) throw error;
        callback(error, queryResult);
      });
    },

    create: (newInvoice,callback) => {
      console.log(newInvoice);
      const queryString = 'INSERT INTO invoices (gross_amount,GST,discount,net_amount,created_date)\
      VALUES($1,$2,$3,$4,$5) returning id'
  	  const values = [
        newInvoice.gross_amount,
        newInvoice.GST,
        newInvoice.discount,
        newInvoice.net_amount,
        newInvoice.created_date
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

        dbPool.query(secondQuery,(error2,secondResult) => {
          if(error2) throw error2;
          let thirdQuery = "INSERT INTO products (id,name,description,price,quantity) VALUES";
          let removeStr = '';
          for(let item of newInvoice.productsData){
            removeStr += '(' + item.id.toString() + ",'" + item.name.toString() + "','" + item.description.toString() + "'," + item.price.toString() + ',' + item.quantity.toString() + '),';
          }
          thirdQuery = (thirdQuery + removeStr).replace(/.$/g, ' ON CONFLICT (id) DO UPDATE SET name = excluded.name, description = excluded.description, price = excluded.price, quantity = excluded.quantity ');
          console.log(thirdQuery);

          dbPool.query(thirdQuery,(error3,thirdResult) => {
            if(error3) throw error3;
            callback(error, thirdResult);
          })
        })
      });	    	
    }
	}
}