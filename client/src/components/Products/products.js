import React from 'react';
import {getAPI,postAPI} from '../../Util';
import ProductsList from './productsList';
import ProductsAdd from './productsAdd';

class Products extends React.Component{
	constructor(){
    super();
    this.state = {
      productsData : [],
      newProduct: {
        id: '',
        name: '',
        description: ''
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
    let newProduct = this.state.newProduct;
    postAPI('/api/products/new',newProduct);
    let data = this.state.productsData;
    newProduct.id = data[data.length-1].id + 1;
    data.push(newProduct);
  	this.setState({
      newProduct: {},
      data: data
    });
  }  

  render() {
    return (
    	<div className = "productsWrapper container">
    		<h1> Products </h1>
        <ProductsList productsData={this.state.productsData} />
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

export default Products;