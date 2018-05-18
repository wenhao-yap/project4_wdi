import React, { Component } from 'react';
import Routes from './components/Layout/routes'
import Sidebar from './components/Layout/sidebar'
import './components/Layout/layout.css';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar className='sidebar'/>
        <div className='content'>
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
