import React from 'react';
import { withRouter } from 'react-router-dom';
import { Tab } from 'semantic-ui-react'
import Invoice from './NewInvoice/invoice';

class Invoices extends React.Component{
  render() {
    const panes = [
      { menuItem: 'View Invoices', render: () => <Tab.Pane attached={false}>View invoices</Tab.Pane> },
      { menuItem: 'Add Invoice', render: () => <Tab.Pane attached={false}><Invoice/></Tab.Pane> },
    ]
    return (
    	<div className = "invoicesWrapper container">
        <Tab menu={{ pointing: true }} panes={panes} />
      </div>   
    );
  }  
}

export default withRouter(Invoices);