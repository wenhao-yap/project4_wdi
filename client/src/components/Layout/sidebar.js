import React from 'react';
import { Link,withRouter } from "react-router-dom";
import { Menu,Header } from 'semantic-ui-react';
import decode from 'jwt-decode';
import './layout.css';

class Sidebar extends React.Component {
  constructor(){
    super();
    this.state = {activeItem : 'home'};
  }

  handleItemClick(e,data){
    this.setState({activeItem: data.name});
  }

  handleLogOff(e) {
    console.log('logoff');
    e.preventDefault();
    localStorage.removeItem("wdi4");
    this.props.history.push('/');
    this.setState({activeItem: 'home'});
  }

  render() {
    let userInfo = {};
    if (localStorage["wdi4"]) {
      userInfo = decode(localStorage.getItem('wdi4'),'what-is-love');
    }

    return (
     <Menu vertical fixed='left' inverted className='sidebar-color'>
        <Menu.Item>
          <Header as='h1' inverted color='teal'>SimpleTory</Header>
          <Header as='h4' inverted color='purple' className='sideBarSubHead'>Inventory management</Header>
        </Menu.Item>
        <Menu.Item 
          as={Link} to='/'
          name='home' 
          active={this.state.activeItem === 'home'}
          className='sidebar-font'
          color='violet'
          onClick={(e,data) => this.handleItemClick(e,data)}>
          Home</Menu.Item>
        {Object.keys(userInfo).length === 0 && userInfo.constructor === Object ? 
        (<div>         
          <Menu.Item
            as={Link} to='/login'
            name='login' 
            active={this.state.activeItem === 'login'}  
            className='sidebar-font'
            color='violet'
            onClick={(e,data) => this.handleItemClick(e,data)}>
            Login</Menu.Item>
          <Menu.Item 
            as={Link} to='/register'
            name='register' 
            active={this.state.activeItem === 'register'}  
            className='sidebar-font'
            color='violet'
            onClick={(e,data) => this.handleItemClick(e,data)}>
            Register</Menu.Item>
        </div>):
        (<div> 
          <Menu.Item 
            as={Link} to='/products'
            name='products' 
            active={this.state.activeItem === 'products'} 
            className='sidebar-font'
            color='violet'
            onClick={(e,data) => this.handleItemClick(e,data)}>
            Products </Menu.Item>
          <Menu.Item 
            as={Link} to='/invoices'
            name='invoices' 
            active={this.state.activeItem === 'invoices'} 
            className='sidebar-font'
            color='violet'
            onClick={(e,data) => this.handleItemClick(e,data)}>
            Invoices</Menu.Item>
          <Menu.Item 
            as={Link} to='/signOut'
            name='signOut' 
            active={this.state.activeItem === 'signOut'}  
            className='sidebar-font'
            color='violet'
            onClick={(e) => this.handleLogOff(e)}>
            Logout</Menu.Item>
        </div>)}         
      </Menu>
    );
  }
}

export default withRouter(Sidebar);
