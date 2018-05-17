import React from 'react';
import {Route,Redirect} from "react-router-dom";
import decode from 'jwt-decode';

const checkAuth = () => {
  const token = localStorage.getItem('wdi4');
  if(!token){
    return false;
  }
  try {
    const {exp} = decode(token);
    if(exp < new Date().getTime()/1000){
      localStorage.clear();
      return false;
    }
  } catch(e) {
    return false;
  }
  return true;
}

export const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkAuth() ? (<Component {...props} />
    ):(
      <Redirect to={{pathname: 'login'}} />
    )
  )} />
)