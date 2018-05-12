import React, { Component } from 'react';
import { Route, Link, withRouter } from "react-router-dom";
import Products from './components/Products/products';
import Home from './components/home'
import './App.css';

class App extends Component {

  render() {
    return (
    	<div>
		  	<nav>
          <h1>- Navbar -</h1>
          <Link to="/">Home</Link>
          <span>&nbsp;&nbsp;</span>
          <Link to="/products">Products</Link>
	      </nav>
	      <main>
	      	<Route exact path="/"             render={() => (
              <Home />
            )} />
          <Route
            path='/products'
            render={() => (
              <Products />
            )}
          />
	      </main>
		  </div>
    );
  }
}

export default withRouter(App);
