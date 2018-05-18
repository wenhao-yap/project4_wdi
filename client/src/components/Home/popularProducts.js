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
      let temp = [];
      invoices.forEach(item =>{
        item.name.forEach( product =>{temp.push({name:product});});
      })
      temp = temp.reduce(function(sums,entry){
         sums[entry.name] = (sums[entry.name] || 0) + 1;
         return sums;
      },{});
      let sorted = [];
      for(let key in temp){
        sorted.push({name:key,count:temp[key]})
      }
      sorted.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
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
          <Table.Cell>{item.count}</Table.Cell>
        </Table.Row>
      );
    })

    return (
      <Table basic='very' celled collapsing className="tableAlign">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Invoices</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table>
    );
  }
}

export default PopularProducts;