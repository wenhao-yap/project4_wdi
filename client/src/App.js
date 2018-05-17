import React, { Component } from 'react';
import Header from './components/Layout/header'
import Routes from './components/Layout/routes'

class App extends Component {

  render() {
    return (
    	<div>
        <Header />
        <main>
          <Routes />
        </main>
        <p>Footer here</p>
		  </div>
    );
  }
}

export default App;
