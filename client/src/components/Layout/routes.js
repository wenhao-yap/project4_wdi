import React from 'react';
import {Switch,Route,withRouter} from "react-router-dom";
import {AuthRoute} from '../Auth/auth';
import Home from '../Home/home'
import Products from '../Products/products';
import Invoices from '../Invoices/invoices';
import Login from '../Auth/login';
import Register from '../Auth/register';
import NotFoundPage from './notFoundPage';

class Routes extends React.Component {
  render() {
    return (
        <Switch>       
          <Route exact path="/" component={Home}/>
          <AuthRoute path='/products' component={Products}/>
          <AuthRoute path='/invoices' component={Invoices}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route component={NotFoundPage} />          
        </Switch>
    );
  }
}

export default withRouter(Routes);