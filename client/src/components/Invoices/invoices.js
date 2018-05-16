import React from 'react';
import { withRouter } from 'react-router-dom';
import { Tab,Container } from 'semantic-ui-react'
import {getAPI} from '../../Util';
import Invoice from './NewInvoice/invoice';
import InvoicesList from './invoicesList';

class Invoices extends React.Component{
  constructor(){
    super();
    this.state = {
      invoicesData:[]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData(){
    getAPI('/api/invoices', (res) => {
      let invoices = this.sorting(res);
      console.log(invoices);
      this.setState({invoicesData: invoices})
    })    
  }

  sorting(array){
    let output = [];
    array.forEach((item) => {
      let existing = output.filter((newItem,i)=>{
        return newItem.id === item.id
      });
      if(existing.length){
        let existingIndex = output.indexOf(existing[0]);
        output[existingIndex].name = output[existingIndex].name.concat(item.name);
        output[existingIndex].quantity = output[existingIndex].quantity.concat(item.quantity);
      } else{
        if (typeof item.name === 'string'){
          item.name = [item.name];
          item.quantity = [item.quantity];
          output.push(item);
        }
      }
    })
    return output;
  }

  handleChange(e,data){
    if(data.activeIndex === 0){
      this.getData();  
    }
  }

  render() {
    const panes = [
      { menuItem: 'Manage Invoices', render: () => <Tab.Pane attached={false}>
        {this.state.invoicesData ? (<InvoicesList invoicesData = {this.state.invoicesData}/>
        ):(<h2>Loading...</h2>)}
        </Tab.Pane> },
      { menuItem: 'Add Invoice', render: () => <Tab.Pane attached={false}><Invoice/></Tab.Pane> },
    ]
    return (
    	<Container>
        <Tab menu={{ pointing: true }} panes={panes} onTabChange={this.handleChange}/>
      </Container>   
    );
  }  
}

export default withRouter(Invoices);