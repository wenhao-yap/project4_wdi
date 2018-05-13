import React from 'react';
import { Table } from 'reactstrap';
import {getAPI,postAPI} from '../../../Util';
import ItemForm from './itemForm';
import Compute from './compute';

class Invoice extends React.Component{
	constructor(){
		super();
		this.state = {
			productsData:[],
			items:[],
			compute:{
			  gross_amount: 0,
	      GST: 0,
	      discount: 0,
	      net_amount: 0
	    }
		};
		this.addRow = this.addRow.bind(this);
	}

	 componentDidMount() {
    getAPI('/api/products', (res) => {
      this.setState({productsData: res})
    }) 
  }

	addRow(){
		let items = this.state.items;
		let newItem = {
      product_id: '',
      name: '',
      price: '',
      quantity: '',
      amount: ''			
		};
		items.push(newItem);
		this.setState({items:items});
		console.log("row added"); 
	}

	removeRow(e){
		let items = this.state.items;
		let removeItem = JSON.parse(e.target.name);
		items = items.slice(0,removeItem.index).concat(items.slice(removeItem.index + 1));
		this.setState({items:items});
		console.log(removeItem);
		console.log("row deleted");
	}

	handleChange(e){
    let items = this.state.items;
    let type = (e.target.name).match(/^[^_]+/)[0];
    let index = parseInt(((e.target.name).match(/[^_]+$/)[0]),10);
   	items[index][type] = e.target.value;
		items[index].amount = parseFloat(e.target.value * items[index].price).toFixed(2); 
  	this.setState({items:items});		
  }

  handleSelect(e){
    let product = JSON.parse(e.target.value);
    console.log(product);

    let items = this.state.items;
    items[product.index].name = product.name;
    items[product.index].product_id = product.id;
    items[product.index].price = product.price;
    this.setState({items:items});  
  }

  handleCompute(e){
  	console.log("computing..");
  	let items = this.state.items;
  	let compute = this.state.compute;
  	compute.gross_amount = 0;
  	compute.GST = 0;
  	compute.net_amount = 0;
  	for(let i=0; i<items.length;i++){
  		compute.gross_amount = (Number(items[i].amount) + Number(compute.gross_amount)).toFixed(2);
  	}
  	compute.GST = (Number(compute.gross_amount) * 0.07).toFixed(2);
  	compute.net_amount = (Number(compute.gross_amount) + Number(compute.GST) - Number(compute.discount)).toFixed(2);
  	this.setState({compute:compute}); 
  }

  handleDiscount(e){
    let compute = this.state.compute;
    compute.discount = parseFloat(e.target.value).toFixed(2);
    this.setState({compute:compute});
    this.handleCompute();
  }

  handleConfirm(e){
    //push data to server
    let dataPackage = {
      items:this.state.items,
      gross_amount: this.state.compute.gross_amount,
      GST: this.state.compute.GST,
      discount: this.state.compute.discount,
      net_amount: this.state.compute.net_amount      
    };
    postAPI('/api/invoices/new',dataPackage);
    console.log(dataPackage);
    console.log("sent dataPackage");
  }

	render(){
		return(
			//invoice table with forms inside. each time a add function is click,
			//append a new row to the table with another form
			// invoice computation
			<div className="container">
				<Table bordered hover>
      		<thead>
        		<tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th><button onClick={this.addRow}>ADD</button></th>
       			</tr>
     		 	</thead>
     		 	{this.state.productsData.length > 0 && 
	      		<ItemForm 
	      			items = {this.state.items}
	      			productsData = {this.state.productsData}
	      			handleChange = {(e) => this.handleChange(e)}
	      			handleSelect = {(e) => this.handleSelect(e)}
	      			removeRow = {(e) => this.removeRow(e)}
      		/>}
        </Table>
        <Compute 
        	items = {this.state.items}
        	compute = {this.state.compute}
        	handleCompute = {(e) => this.handleCompute(e)}
        	handleDiscount = {(e) => this.handleDiscount(e)}
          handleConfirm = {(e) => this.handleConfirm(e)}
        />
			</div>
		)
	}
}

export default Invoice;