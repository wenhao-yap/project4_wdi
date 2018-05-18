import React from 'react';
import { Table } from 'semantic-ui-react'
import {getAPI} from '../../Util';

class LowStock extends React.Component {
  constructor(){
    super();
    this.state = {
      productsData : []
    }
  }  

  componentDidMount() {
    getAPI('/api/products', (res) => {
      res.sort((a, b) => parseFloat(a.quantity) - parseFloat(b.quantity));
      res = res.slice(0,5);
      this.setState({productsData: res})
    }) 
  }

  render() {
    let rows = this.state.productsData.map(item => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.quantity}</Table.Cell>
          <Table.Cell>{item.price}</Table.Cell>
        </Table.Row>
      );
    })

    return (
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table>
    );
  }
}

export default LowStock;