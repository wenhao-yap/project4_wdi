import React from 'react';
import { Table } from 'semantic-ui-react'
import {getAPI} from '../../Util';
import './home.css';

class PopularProducts extends React.Component {
  constructor(){
    super();
    this.state = {
      productsCount : []
    }
  }  

  componentDidMount(){
    getAPI('/api/invoices', (res) => {
      let invoices = this.sorting(res);
      let products = [];
      invoices.forEach(item =>{
        item.name.forEach( (product,j) =>{
          let newProduct = {
            name:product,
            quantity:item.quantity[j]
          }
          products.push(newProduct);
        });
      })
      console.log(products);
      let sorted = products.reduce((acc, curr) => {
        if(acc.some(obj => obj.name === curr.name)) {
          acc.forEach(obj => {
            if(obj.name === curr.name) {
              obj.quantity = parseInt(obj.quantity,10) + parseInt(curr.quantity,10);
            }
          });
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      sorted.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
      console.log(sorted);
      if(sorted.length > 5){
        sorted = sorted.slice(0,5);
      }
      this.setState({productsCount: sorted})
    })    
  }

  sorting(array){
    let output = [];
    array.forEach((item) => {
      let existing = output.filter((newItem,i)=>{
        return newItem.id === item.id
      });
      if(existing.length){
        let existingIndex = output.indexOf(existing[0]);
        output[existingIndex].name = output[existingIndex].name.concat(item.name);
        output[existingIndex].quantity = output[existingIndex].quantity.concat(item.quantity);
      } else{
        if (typeof item.name === 'string'){
          item.name = [item.name];
          item.quantity = [item.quantity];
          output.push(item);
        }
      }
    })
    return output;
  }

  render() {
    let rows = this.state.productsCount.map(item => {
      return (
        <Table.Row key={item.name}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.quantity}</Table.Cell>
        </Table.Row>
      );
    })

    return (
      <Table basic='very' celled collapsing className="tableAlign">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Items sold</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table>
    );
  }
}

export default PopularProducts;