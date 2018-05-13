import React from 'react';
import { withRouter } from 'react-router-dom';
import Invoice from './NewInvoice/invoice';

class Invoices extends React.Component{

  render() {
    return (
    	<div className = "invoicesWrapper container">
        <Invoice/>
      </div>   
    );
  }  
}

export default withRouter(Invoices);