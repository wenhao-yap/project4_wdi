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
      const queryString = 'INSERT INTO invoices (client,gross_amount,discount,total_amount,paid_status,amount_payable,date)\
      VALUES($1,$2,$3,$4,$5,$6,$7) returning id'
  	  const values = [
        newInvoice.client,
        newInvoice.gross_amount,
        newInvoice.discount,
        newInvoice.total_amount,
        newInvoice.paid_status,
        newInvoice.amount_payable,
        newInvoice.date
  	  ];

      dbPool.query(queryString,values, (error, queryResult) => {
        if(error) throw error;
          callback(error, queryResult);
      });	    	
    }
	}
}