import React from 'react';
import { Table } from 'semantic-ui-react'
import './home.css';

class LowStock extends React.Component {
  constructor(){
    super();
    this.state = {
      sortedData : []
    }
  }  

  componentDidMount() {
    let data = this.props.productsData;
    data.sort((a, b) => parseFloat(a.quantity) - parseFloat(b.quantity));
    data = data.slice(0,5);
    this.setState({sortedData: data})
  }

  render() {
    let rows = this.state.sortedData.map(item => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.brand}</Table.Cell>
          <Table.Cell>{item.quantity}</Table.Cell>
          <Table.Cell>{item.price}</Table.Cell>
        </Table.Row>
      );
    })

    return (
      <Table basic='very' celled collapsing className="tableAlign">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Brand</Table.HeaderCell>
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