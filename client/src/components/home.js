import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import decode from 'jwt-decode';

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
    	</Container> 
    );
  }
}

export default withRouter(Home);