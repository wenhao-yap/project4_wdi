import React from 'react';
import { Table,Label } from 'semantic-ui-react';

class InvoicesTable extends React.Component{
  render() {
 
    //paginating the results based on date range if any
    let rows = this.props.dateRangeData.slice(this.props.firstIndex,this.props.lastIndex).map((item,i) => {
      let product = item.name.map((product,j)=>{
          return(
            <Label color='black' key={product}>{product}
              <Label.Detail>{item.quantity[j]}</Label.Detail>
            </Label>
          )
        }
      );
      let date = new Date(item.created_date).toUTCString();
      return(
        <Table.Row key={i}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{product}</Table.Cell>
          <Table.Cell>${item.gross_amount}</Table.Cell>
          <Table.Cell>${item.discount}</Table.Cell>
          <Table.Cell>${item.net_amount}</Table.Cell>
          <Table.Cell>{date}</Table.Cell>
        </Table.Row>
      )     
    });

    return (   
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Products(quantity)</Table.HeaderCell>
            <Table.HeaderCell>Gross Amt</Table.HeaderCell>
            <Table.HeaderCell>Discount</Table.HeaderCell>
            <Table.HeaderCell>Net Amt</Table.HeaderCell>
            <Table.HeaderCell>Date Created(UTC)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table>
    );
  }  
}

export default InvoicesTable;