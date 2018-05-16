import React from 'react';
import {getAPI,postAPI,getIndexIfObjWithOwnAttr} from '../../Util';
import { Container } from 'semantic-ui-react'
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
      },
      editMode : false,
      productIDToDelete : []
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

  // handleRemove(data){
  //   let productsData = this.state.productsData;
  //   let index = getIndexIfObjWithOwnAttr(productsData,'id',data.id);
  //   console.log("index:" + index);
  //   productsData = productsData.slice(0,index)
  //                      .concat(productsData.slice(index + 1));
  //   this.setState({productsData:productsData});
  // }

  handleMode(e){
    if(this.state.editMode){
      this.setState({editMode:false});
    } else {
      this.setState({editMode:true});
    }    
  } 

  handleEditCell(e){
    //update data for client
    let productsData = this.state.productsData;
    let type = (e.target.name).match(/^[^_]+/)[0];
    let index = parseInt(((e.target.name).match(/[^_]+$/)[0]),10);
    productsData[index][type] = e.target.value;
    this.setState({productsData:productsData});
  }

  keyPressEditCell(e){
    //update data for server
    if(e.keyCode == 13){
      console.log(e.target.value);
      let productsData = this.state.productsData;
      let type = (e.target.name).match(/^[^_]+/)[0];
      let index = parseInt(((e.target.name).match(/[^_]+$/)[0]),10);     
      let updatedProduct = productsData[index];
      updatedProduct[type] = e.target.value;   
      console.log(updatedProduct);
      postAPI('/api/products/edit',updatedProduct);
      this.setState({editMode:false})
    }
  }

  selectDelete(e){
    //to be added for deletion
  }

  render() {
    return (
    	<Container>
    		<h1> Products </h1>
        {this.state.productsData.length > 0 &&
          <ProductsList
            editCell={this} 
            productsData={this.state.productsData}
            editMode={this.state.editMode}
            handleMode = {(e) => this.handleMode(e)}
            keyPressEditCell = {(e) => this.keyPressEditCell(e)}
            handleEditCell = {(e) => this.handleEditCell(e)}/>
        }
        <h2> Add product here </h2>
        <ProductsAdd 
          handleChange = {(e) => this.handleChange(e)} 
          handleSubmit = {(e) => this.handleSubmit(e)} 
          newProduct = {this.state.newProduct} 
        />
      </Container>   
    );
  }  
}

export default withRouter(Products);