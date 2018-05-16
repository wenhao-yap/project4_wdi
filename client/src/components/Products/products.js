import React from 'react';
import {getAPI,postAPI,deleteAPI,getIndexIfObjWithOwnAttr} from '../../Util';
import { Container,Button, Header, Icon, Modal } from 'semantic-ui-react'
import ProductsList from './productsList';
import ProductsAdd from './productsAdd';
import { withRouter } from 'react-router-dom';
import './products.css';

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
      deleteStore : [],
      modalOpen: false
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
    let newProduct = this.state.newProduct;
    newProduct.price = parseFloat(newProduct.price).toFixed(2);
    newProduct.quantity = parseInt(newProduct.quantity,10);    
    postAPI('/api/products/new',newProduct);
    let data = this.state.productsData;
    newProduct.id = data[data.length-1].id + 1;
    data.push(newProduct);
  	this.setState({
      newProduct: {},
      data: data,
      modalOpen:false
    });
  } 

  handleOpen(e){
    this.setState({ modalOpen: true });
  }

  handleClose(e){
    this.setState({ modalOpen: false });
  }

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
    if(e.keyCode === 13){
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

  selectDelete(e,data){
    let deleteStore = this.state.deleteStore;
    if(data.checked){      
      deleteStore.push(parseInt(data.name,10));
      this.setState(deleteStore:deleteStore);         
    } else {
      this.setState({deleteStore: deleteStore.filter((id)=> { 
          return id !== parseInt(data.name,10)
      })});
    }
  }

  handleDelete(e){
    let productsData = this.state.productsData;
    this.state.deleteStore.forEach(id => {
      let index = getIndexIfObjWithOwnAttr(productsData,'id',id);
      productsData = productsData.slice(0,index).concat(productsData.slice(index + 1));
    })
    deleteAPI('/api/products/delete',this.state.deleteStore);
    this.setState({
      productsData:productsData,
      deleteStore:[]
    });    
  }

  render() {
    return (
    	<Container>
    		<h1> Products </h1>
        {this.state.productsData.length > 0 &&
          <ProductsList
            productsData={this.state.productsData}
            handleOpen={(e) => this.handleOpen(e)}
            editMode={this.state.editMode}
            handleMode = {(e) => this.handleMode(e)}
            keyPressEditCell = {(e) => this.keyPressEditCell(e)}
            handleEditCell = {(e) => this.handleEditCell(e)}
            selectDelete = {(e,data) => this.selectDelete(e,data)}
            deleteStore = {this.state.deleteStore}
            handleDelete = {(e) => this.handleDelete(e)}/>
        }
        <Modal open={this.state.modalOpen} onClose={(e) => this.handleClose(e)} size='small'>
          <Header icon='shop' content='New product' />
          <Modal.Content>
            <ProductsAdd 
              handleChange = {(e) => this.handleChange(e)}  
              newProduct = {this.state.newProduct} 
            />
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={(e) => this.handleClose(e)} inverted>
              <Icon name='remove' /> Cancel</Button>
            <Button color='green' onClick={(e) => this.handleSubmit(e)} inverted><Icon name='checkmark' /> Submit</Button>
          </Modal.Actions>
        </Modal>
      </Container>   
    );
  }  
}

export default withRouter(Products);