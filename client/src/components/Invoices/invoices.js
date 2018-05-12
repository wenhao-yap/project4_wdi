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
        client: '',
        gross_amount: 0,
        afterGST: 0,
        discount: 0,
        total_amount: 0,
        paid_status: '',
        amount_payable: '',
        date: '',
        items: []  //pushed all invoice_item here
      },
      pickedItem: {},
      invoice_item: {
        product_id: '',
        name: '',
        price: '',
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
    let pickedItem = this.state.pickedItem;
    pickedItem.price = parseFloat(pickedItem.price).toFixed(2);
    invoice_item.quantity = quantity;
    invoice_item.cost = (quantity * pickedItem.price).toFixed(2);
    invoice_item.name = pickedItem.name;
    invoice_item.price = pickedItem.price;
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
    //compute gross amount, GST and total
    newInvoice.gross_amount = Number(newInvoice.gross_amount) + Number(this.state.invoice_item.cost);
    newInvoice.afterGST = parseFloat(newInvoice.gross_amount * 1.07).toFixed(2);
    newInvoice.gross_amount = parseFloat(newInvoice.gross_amount).toFixed(2);
    newInvoice.total_amount = newInvoice.afterGST;

    this.setState({
      productsData:productsData,
      invoice_item:{},
      newInvoice:newInvoice
    });
  }  

  handleDiscount(event){
    let newInvoice = this.state.newInvoice;
    newInvoice.discount = parseFloat(event.target.value).toFixed(2);
    newInvoice.total_amount = parseFloat(Number(newInvoice.afterGST) - Number(newInvoice.discount)).toFixed(2);
    this.setState({newInvoice:newInvoice,})
  }

  render() {

    return (
    	<div className = "invoicesWrapper container">
        <NewInvoiceItem
          handleSelect = {(e) => this.handleSelect(e)}
          handleChange = {(e) => this.handleChange(e)}  
          handleSubmit = {(e) => this.handleSubmit(e)} 
          newInvoice = {this.state.newInvoice}
          productsData = {this.state.productsData}
          invoice_item = {this.state.invoice_item} 
        />
        <NewInvoice 
          invoice = {this.state.newInvoice} 
          handleDiscount = {(e) => this.handleDiscount(e)}
        />
      </div>   
    );
  }  
}

export default withRouter(Invoices);