import React from 'react';
import _ from 'lodash'
import {getAPI,postAPI,deleteAPI,getIndexIfObjWithOwnAttr} from '../../Util';
import { Container,Button, Header, Icon, Modal, Search } from 'semantic-ui-react'
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
        brand: '',
        description: '',
        price: '',
        quantity: ''
      },
      editMode : false,
      deleteStore : [],
      modalOpen: false,
      search: {
        results: [],
        isLoading: false
      }
    }
  }

  componentDidMount() {
    getAPI('/api/products', (res) => {
      this.setState({productsData: res})
    }) 
  }

  //Modal functions to add new product
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

  handleResultSelect(e,data){
    let newProduct = this.state.newProduct;
    newProduct.brand = data.result.title;
    this.setState({ newProduct: newProduct });
  }

  handleSearchChange(e){
    let newProduct = this.state.newProduct;
    let search = this.state.search;
    newProduct.brand = e.target.value;
    search.isLoading = true;
    this.setState({
      newProduct:newProduct,
      search:search
    });
    let url = 'https://autocomplete.clearbit.com/v1/companies/suggest?query=' + e.target.value;
    if(e.target.value.length > 0){
      this.getBrands(url);
    }
  }

  getBrands(url){
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      let data = json.map(item => {
        return {
          title:item.name,
          description:item.domain,
          image:item.logo
        }
      })
      console.log(data);
      const re = new RegExp(_.escapeRegExp(this.state.newProduct.brand), 'i');
      const isMatch = result => re.test(result.title);
      let search = this.state.search;
      search.isLoading = false;
      search.results = _.filter(data, isMatch)
      this.setState({search:search});
    });
  }

  //Table to view/edit/delete products
  handleMode(e){
    if(this.state.editMode){
      this.setState({editMode:false});
    } else {
      this.setState({editMode:true});
    }    
  } 

  handleEditCell(e){
    console.log(e.target.name);
    //update data for client
    let productsData = this.state.productsData;
    let type = (e.target.name).match(/^[^_]+/)[0];
    let id = parseInt(((e.target.name).match(/[^_]+$/)[0]),10);
    let index = getIndexIfObjWithOwnAttr(productsData,'id',id);
    productsData[index][type] = e.target.value;
    console.log(productsData[index]);
    this.setState({productsData:productsData});
  }

  keyPressEditCell(e){
    //update data for server
    if(e.keyCode === 13){
      console.log(e.target.value);
      let productsData = this.state.productsData;
      let type = (e.target.name).match(/^[^_]+/)[0];
      let id = parseInt(((e.target.name).match(/[^_]+$/)[0]),10);
      let index = getIndexIfObjWithOwnAttr(productsData,'id',id);     
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
            />
            <label className='brandField'>Brand</label>
            <Search
              loading={this.state.search.isLoading}
              onResultSelect={(e,data) => this.handleResultSelect(e,data)}
              onSearchChange={_.debounce((e) => this.handleSearchChange(e), 500, { leading: true })}
              results={this.state.search.results}
              value={this.state.newProduct.brand}
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