import React from 'react';
import {getAPI,postAPI,getIndexIfObjWithOwnAttr} from '../../../Util';
import ItemForm from './itemForm';
import Compute from './compute';
import './invoice.css';

class Invoice extends React.Component{
	constructor(){
		super();
		this.state = {
			productsData:[],
			items:[{
          product_id: '',
          name: '',
          price: '',
          quantity: '',
          amount: ''      
        }
      ],
			compute:{
			  gross_amount: 0,
	      GST: 0,
	      discount: 0,
	      net_amount: 0
	    }
		};
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

  //handle onChange event of the quantity
	handleChange(e){
    let items = this.state.items;
    let type = (e.target.name).match(/^[^_]+/)[0];
    let index = parseInt(((e.target.name).match(/[^_]+$/)[0]),10);
   	items[index][type] = e.target.value;
		items[index].amount = parseFloat(e.target.value * items[index].price).toFixed(2);
  	this.setState({items:items});		
  }

  handleSelect(e){
    console.log(e.target.value);
    let product = JSON.parse(e.target.value);
    let items = this.state.items;
    items[product.index].name = product.name;
    items[product.index].product_id = product.id;
    items[product.index].price = product.price;
    if(items[product.index].quantity){
      items[product.index].amount = (Number(items[product.index].price) * Number(items[product.index].quantity)).toFixed(2);
    }
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
    //remove from productsData the quantity selected
    let productsData = this.state.productsData;
    let items = this.state.items;
    for (let i = 0; i<this.state.items.length; i++){
      let productsIndex = getIndexIfObjWithOwnAttr(productsData,'id',items[i].product_id);
      productsData[productsIndex].quantity -= parseInt(items[i].quantity,10);
    }

    //push data to server
    let dataPackage = {
      productsData:productsData,
      items:items,
      gross_amount: this.state.compute.gross_amount,
      GST: this.state.compute.GST,
      discount: this.state.compute.discount,
      net_amount: this.state.compute.net_amount      
    };
    postAPI('/api/invoices/new',dataPackage);
    console.log(dataPackage);
    console.log("sent dataPackage, resetting form");
    this.setState({
      productsData: productsData,
      items:[],
      compute:{
        gross_amount: 0,
        GST: 0,
        discount: 0,
        net_amount: 0
      }
    })
  }

	render(){
		return(
			//invoice table with forms inside. each time a add function is click,
			//append a new row to the table with another form
			// invoice computation
			<div className="container">
        {this.state.productsData.length > 0 && 
      		<ItemForm 
      			items = {this.state.items}
      			productsData = {this.state.productsData}
      			handleChange = {(e) => this.handleChange(e)}
      			handleSelect = {(e) => this.handleSelect(e)}
      			removeRow = {(e) => this.removeRow(e)}
            addRow = {(e) => this.addRow(e)}
    		  />
        }
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