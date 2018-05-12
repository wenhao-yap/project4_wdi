import React from 'react';
import { withRouter } from 'react-router-dom';
import {getAPI,getIndexIfObjWithOwnAttr} from '../../Util';
import NewInvoice from './newInvoice';

class Invoices extends React.Component{
  constructor(){
    super();
    this.state = {
      productsData : [],
      invoicesData : [],
      newInvoice: {
        id: '',
        client: '',
        gross_amount: '',
        discount: '',
        total_amount: '',
        paid_status: '',
        amount_payable: '',
        date: '',
        items: []  //pushed invoice_item here
      },
      pickedItem: {}
    }
  }

  componentDidMount() {
    getAPI('/api/products', (res) => {
      this.setState({productsData: res})
    }) 
  }

  handleSelect(event){
    let pickedItem = JSON.parse(event.target.value)
    console.log(pickedItem);
    this.setState({pickedItem:pickedItem});  
  }

  handleSubmit(event){
    event.preventDefault();
    //remove from datalist
    let pickedItem = this.state.pickedItem;
    let productsData = this.state.productsData;
    let index = getIndexIfObjWithOwnAttr(productsData,'id',pickedItem.id);
    console.log("index:" + index);
    productsData = productsData.slice(0,index)
                       .concat(productsData.slice(index + 1));
    this.setState({productsData:productsData});
    //push to items
  }  

  render() {
    return (
    	<div className = "invoicesWrapper container">
    		<h1> Invoices </h1>
        <NewInvoice
          handleSelect = {(e) => this.handleSelect(e)} 
          handleSubmit = {(e) => this.handleSubmit(e)} 
          newInvoice = {this.state.newInvoice}
          productsData = {this.state.productsData} 
        />
      </div>   
    );
  }  
}

export default withRouter(Invoices);