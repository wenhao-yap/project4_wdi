import React from 'react';
import { withRouter } from 'react-router-dom';
import {getAPI,getIndexIfObjWithOwnAttr} from '../../Util';
import NewInvoiceItem from './newInvoiceItem';
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
        items: []  //pushed all invoice_item here
      },
      pickedItem: {},
      invoice_item: {
        product_id: '',
        quantity: '',
        cost: ''
      }
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
    let invoice_item = this.state.invoice_item;
    invoice_item.product_id = pickedItem.id;
    this.setState({
      pickedItem:pickedItem,
      invoice_item:invoice_item
    });  
  }

  handleChange(event){
    let quantity = parseInt(event.target.value,10)
    let invoice_item = this.state.invoice_item;
    invoice_item.quantity = quantity;
    let pickedItem = this.state.pickedItem;
    pickedItem.price = parseFloat(pickedItem.price).toFixed(2);
    invoice_item.cost = (quantity * pickedItem.price).toFixed(2);;  
    this.setState({invoice_item:invoice_item});
  }

  handleSubmit(event){
    event.preventDefault();
    event.target.reset();
    //remove from datalist
    let pickedItem = this.state.pickedItem;
    let productsData = this.state.productsData;
    let index = getIndexIfObjWithOwnAttr(productsData,'id',pickedItem.id);
    console.log("index:" + index);
    productsData = productsData.slice(0,index)
                       .concat(productsData.slice(index + 1));
    //push to items
    let newInvoice = this.state.newInvoice;
    newInvoice.items.push(this.state.invoice_item);
    console.log("Added " + JSON.stringify(this.state.invoice_item) + " to invoice");
    this.setState({
      productsData:productsData,
      invoice_item:{}
    });
  }  

  render() {
    return (
    	<div className = "invoicesWrapper container">
    		<h3> Add item </h3>
        <NewInvoiceItem
          handleSelect = {(e) => this.handleSelect(e)}
          handleChange = {(e) => this.handleChange(e)}  
          handleSubmit = {(e) => this.handleSubmit(e)} 
          newInvoice = {this.state.newInvoice}
          productsData = {this.state.productsData}
          invoice_item = {this.state.invoice_item} 
        />
        <NewInvoice/>
      </div>   
    );
  }  
}

export default withRouter(Invoices);