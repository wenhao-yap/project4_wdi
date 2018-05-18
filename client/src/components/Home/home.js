import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container,Grid,Segment } from 'semantic-ui-react'
import decode from 'jwt-decode';
import LowStock from './lowStock'

class Home extends React.Component {

  render() {
  	let userInfo = {};
  	if (localStorage["wdi4"]) {
  		userInfo = decode(localStorage.getItem('wdi4'),'what-is-love');
		}
    return (
    	<Container> 
    		<h1>Home page</h1>
    		{Object.keys(userInfo).length > 0 && userInfo.constructor === Object &&
    		<h3>Welcome back {userInfo.username}</h3>}
        <Grid columns={3} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment><h3>Suggested Items To Restock</h3>
                <LowStock />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>Top items</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>Weekly's Report</Segment>
              <Segment>Today's Report</Segment>
              <Segment>Latest invoices</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>        
    	</Container> 
    );
  }
}

export default withRouter(Home);