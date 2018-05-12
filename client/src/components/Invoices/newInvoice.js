import React from 'react';
import { Table } from 'reactstrap';
import './invoices.css';

class NewInvoice extends React.Component {

  render() {
    let invoiceItems = this.props.invoice.items.map((item,i) => {
      return (
        <tr key={item.product_id}>
          <th scope='row'>{i+1}</th>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
          <td>{item.cost}</td>
        </tr>
      )
    })

  	return(
      <div className='container'>
        <Table bordered hover>
          <thead>
            <tr>
              <th width='1%'>#</th>
              <th width='50%'>Name</th>
              <th width='15%'>Price</th>
              <th width='15%'>Quantity</th>
              <th width='9%'>Cost</th>
            </tr>
          </thead>
          <tbody>{invoiceItems}</tbody>
          <tfoot>
            <tr>
              <th colSpan='4' className='tfoot removeBorder'>Gross amount</th>
              <td>{this.props.invoice.gross_amount}</td>            
            </tr>
            <tr>
              <th colSpan='4' className='tfoot removeBorder'>After GST(7%)</th>
              <td>{this.props.invoice.afterGST}</td>            
            </tr>
            <tr>
              <th colSpan='4' className='tfoot removeBorder'>Discount</th>
              <td>
                <input type="text" 
                  name="discount"
                  onChange={this.props.handleDiscount}
                  size='9'/>
              </td>            
            </tr>
            <tr>
              <th colSpan='4' className='tfoot'>Total Amount</th>
              <td>{this.props.invoice.total_amount}</td>            
            </tr>
          </tfoot>
        </Table>
      </div>
  	);
  }
}
export default NewInvoice;