import React from 'react';
import { Statistic,Image,Icon } from 'semantic-ui-react';
import invoiceIcon from './invoice.png';
import discountIcon from './discount.png';

class InvoicesStats extends React.Component{
  render() {
    //compute statistics
    let totalRevenue = 0;
    let totalProducts = 0;
    let totalDiscount = 0;
    let uniqueProducts = [];
    this.props.dateRangeData.forEach((item)=>{
      item.quantity.forEach((product,j)=>{
        totalProducts += item.quantity[j];
      })
      item.name.forEach((product)=>{
        if(!uniqueProducts.includes(product)){
          uniqueProducts.push(product);
        } 
      })
      totalDiscount += Number(item.discount);  
      totalRevenue += Number(item.net_amount);
    })   

    return (   
      <Statistic.Group>
        <Statistic>
          <Statistic.Value><Image src={invoiceIcon} inline circular />{this.props.dateRangeData.length}</Statistic.Value>
          <Statistic.Label>Invoices</Statistic.Label>
        </Statistic>         
        <Statistic>
          <Statistic.Value><Icon name='shopping cart'/>{totalProducts}</Statistic.Value>
          <Statistic.Label>Products Sold</Statistic.Label>
        </Statistic> 
        <Statistic>
          <Statistic.Value>{uniqueProducts.length}</Statistic.Value>
          <Statistic.Label>Unique Products</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${totalRevenue.toFixed(2)}</Statistic.Value>
          <Statistic.Label>Total Revenue Earned</Statistic.Label>
        </Statistic>         
        <Statistic>
          <Statistic.Value><Image src={discountIcon} inline circular />${totalDiscount.toFixed(2)}</Statistic.Value>
          <Statistic.Label>Discount Given</Statistic.Label>
        </Statistic>                 
      </Statistic.Group>
    );
  }  
}

export default InvoicesStats;