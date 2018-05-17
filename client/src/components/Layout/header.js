import React from 'react';
import { Link,withRouter } from "react-router-dom";
import decode from 'jwt-decode';

class Header extends React.Component {

	handleLogOff(e) {
  	console.log('logoff');
	  e.preventDefault();
	  localStorage.removeItem("wdi4");
	  this.props.history.push('/');
	}

  render() {
  	let userInfo = {};
  	if (localStorage["wdi4"]) {
  		userInfo = decode(localStorage.getItem('wdi4'),'what-is-love');
		}
    return (
    	<div>
		  	<nav>
	          <h1>- Navbar -</h1>
	          <Link to="/">Home</Link>
	          <span>&nbsp;&nbsp;</span>
	          <Link to="/products">Products</Link>
	          <span>&nbsp;&nbsp;</span>
	          <Link to="/invoices">Invoices</Link>
	          <span>&nbsp;&nbsp;</span>
	          <Link to="/login">Login</Link>  
	          <span>&nbsp;&nbsp;</span>
	          <Link to="/register">Register</Link>
	          <span>&nbsp;&nbsp;</span>
	          {Object.keys(userInfo).length > 0 && userInfo.constructor === Object &&
    				<Link to="/signOut" onClick={(e) => this.handleLogOff(e)}>Logoff</Link>}                  
	      </nav>
		</div>
    );
  }
}

export default withRouter(Header);