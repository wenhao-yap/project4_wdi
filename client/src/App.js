import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      data : []
    }
  }

  componentDidMount() {
    this.fetchAPI('/api/products', (res) => {
      this.setState({data: res})
    }) 
  }

  fetchAPI = (url,callback) => {
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
          response.status);
          return;
        }
        response.json().then((data) =>{
          console.log("fetching data");
          callback(data); //make sure to return something
        });
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err);
    });
  }

  render() {
    let output = this.state.data.map(item => {
        return (
          <li>{item.name}</li>
        )
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
            <ul>{output}</ul>    
        </div>
      </div>
    );
  }
}

export default App;
