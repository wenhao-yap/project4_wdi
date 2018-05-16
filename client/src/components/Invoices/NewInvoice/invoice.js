import React from 'react';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
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
	    },
      created_date:new Date(),
		};
	}

	 componentDidMount() {
    getAPI('/api/products', (res) => {
      this.setState({
        productsData: res
      })
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

	removeRow(index,e){
		let items = this.state.items;
    console.log(index);
    console.log(items[index]);
    console.log(items);
		items = items.slice(0,index).concat(items.slice(index + 1));
    console.log(items);
		this.setState({items:items});
		console.log("row deleted");
	}

  handleTime(e){
    console.log(e);
    this.setState({created_date:e});
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

  handleSelect(index,e,data){
    let product = JSON.parse(data.value);
    let items = this.state.items;
    items[index].name = product.name;
    items[index].product_id = product.id;
    items[index].price = product.price;
    if(items[index].quantity){
      items[index].amount = (Number(items[index].price) * Number(items[index].quantity)).toFixed(2);
    }
    console.log(data.value);
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
      net_amount: this.state.compute.net_amount,
      created_date: this.state.created_date     
    };
    postAPI('/api/invoices/new',dataPackage);
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
    Moment.locale('en');
    momentLocalizer();

		return(
			<div className="container">
        <label className="labelForm">Time</label>
        <DateTimePicker
          onChange = {(e) => this.handleTime(e)} 
          defaultValue = {new Date()} 
        />
        {this.state.productsData.length > 0 && 
      		<ItemForm 
      			items = {this.state.items}
      			productsData = {this.state.productsData}
      			handleChange = {(e) => this.handleChange(e)}
      			handleSelect = {this.handleSelect.bind(this)}
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