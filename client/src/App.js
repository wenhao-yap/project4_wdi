import React, { Component } from 'react';
import { Route, Link, withRouter } from "react-router-dom";
import Home from './components/home'
import Products from './components/Products/products';
import Invoices from './components/Invoices/invoices';

class App extends Component {

  render() {
    return (
    	<div>
		  	<nav>
          <h1>- Navbar -</h1>
          <Link to="/">Home</Link>
          <span>&nbsp;&nbsp;</span>
          <Link to="/products">Products</Link>
          <span>&nbsp;&nbsp;</span>
          <Link to="/invoices">Invoices</Link>
	      </nav>
	      <main>
	      	<Route 
            exact path="/"             
            render={() => (<Home/>)} />
          <Route
            path='/products'
            render={() => (<Products/>)}
          />
          <Route
            path='/invoices'
            render={() => (<Invoices/>)}
          />
	      </main>
		  </div>
    );
  }
}

export default withRouter(App);
