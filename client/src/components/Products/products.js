import React from 'react';
import {getAPI,postAPI,getIndexIfObjWithOwnAttr} from '../../Util';
import ProductsList from './productsList';
import ProductsAdd from './productsAdd';
import { withRouter } from 'react-router-dom';

class Products extends React.Component{
	constructor(){
    super();
    this.state = {
      productsData : [],
      newProduct: {
        id: '',
        name: '',
        description: '',
        price: '',
        quantity: ''
      }
    }
  }

  componentDidMount() {
    getAPI('/api/products', (res) => {
      this.setState({productsData: res})
    }) 
  }

	handleChange(event){
    let newProduct = this.state.newProduct;
    newProduct[event.target.name] = event.target.value;
  	this.setState({newProduct:newProduct});		
  }

  handleSubmit(event){
    event.preventDefault();
    event.target.reset();
    let newProduct = this.state.newProduct;
    newProduct.price = parseFloat(newProduct.price).toFixed(2);
    newProduct.quantity = parseInt(newProduct.quantity,10);    
    postAPI('/api/products/new',newProduct);
    let data = this.state.productsData;
    newProduct.id = data[data.length-1].id + 1;
    data.push(newProduct);
  	this.setState({
      newProduct: {},
      data: data
    });
  } 

  handleRemove(data){
    let productsData = this.state.productsData;
    let index = getIndexIfObjWithOwnAttr(productsData,'id',data.id);
    console.log("index:" + index);
    productsData = productsData.slice(0,index)
                       .concat(productsData.slice(index + 1));
    this.setState({productsData:productsData});
  } 

  render() {
    return (
    	<div className = "productsWrapper container">
    		<h1> Products </h1>
        <ProductsList productsData={this.state.productsData} handleRemove = {(e) => this.handleRemove(e)}/>
        <h2> Add product here </h2>
        <ProductsAdd 
          handleChange = {(e) => this.handleChange(e)} 
          handleSubmit = {(e) => this.handleSubmit(e)} 
          newProduct = {this.state.newProduct} 
        />
      </div>   
    );
  }  
}

export default withRouter(Products);