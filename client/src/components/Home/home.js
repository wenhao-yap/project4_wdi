import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container,Grid,Segment,Message } from 'semantic-ui-react'
import {getAPI} from '../../Util';
import decode from 'jwt-decode';
import LowStock from './lowStock'
import PopularProducts from './popularProducts'
import InvoicesStats from '../Invoices/invoicesStats';
import ProductsBrand from './productsBrand';

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      date : '',
      month:'',
      year:'',
      invoicesData:[],
      productsData:[],
      monthlyReport:[]
    }
  }

  componentDidMount() {
    const date = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    getAPI('/api/products', (res) => {
      console.log(res);
      this.setState({productsData: res})
    }) 

    getAPI('/api/invoices', (res) => {
      console.log(res);
      let invoices = this.sorting(res);
      let dateRangeData = [];
      invoices.forEach((item,i) => {
        let itemMonth = months[new Date(item.created_date).getMonth()];
        if (itemMonth === month) {
          dateRangeData.push(item);
        }
      })
      console.log(dateRangeData);
      this.setState({
        invoicesData: invoices,
        monthlyReport: dateRangeData,
        date:date,
        month:month,
        year:year
      })
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
  	let username = '';
  	if (localStorage["wdi4"]) {
  		let userInfo = decode(localStorage.getItem('wdi4'),'what-is-love');
      username = 'Welcome back ' + userInfo.username + '!'
		} 

    return (
    	<Container> 
    		<h1>Home page</h1>
    		{username.length > 0 &&
        <Message
          success
          header={username}
        />}
        <Grid columns={3} divided>
          <Grid.Row stretched>
            <Grid.Column width={16}>
              <Segment>
                <h3>Monthly Report - {this.state.month} {this.state.year}</h3>
                {this.state.monthlyReport.length > 0 &&
                <InvoicesStats dateRangeData={this.state.monthlyReport}/>}
              </Segment>
            </Grid.Column>
          </Grid.Row>        
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <Segment>
                <h3>Suggested Items To Restock</h3>
                {this.state.productsData.length > 0 &&
                <LowStock productsData={this.state.productsData}/>}
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
                <h3>Popular Products</h3>
                {this.state.invoicesData.length > 0 &&
                <PopularProducts invoicesData={this.state.invoicesData}/>}
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>
                <h3 className='brandsTitle'>Product Brands Distribution</h3>
                {this.state.productsData.length > 0 &&
                <ProductsBrand productsData={this.state.productsData}/>}                
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>        
    	</Container> 
    );
  }
}

export default withRouter(Home);