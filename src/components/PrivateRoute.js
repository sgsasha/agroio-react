import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const isLoggedIn = localStorage.getItem('agroioToken');
  const publicRoutes = ["/login", "/signUp"];
  return (
    <Route {...rest} render={props => {
      if (!isLoggedIn) {
        // not logged in so redirect to login page with the return url
        if (!publicRoutes.includes(props.location.pathname)) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
      } else {
        // if logged in - can't access publicRoutes
        if (publicRoutes.includes(props.location.pathname)) {
          return <Redirect to={{ pathname: '/dashboard' }} />
        }
      }
      // logged in so return component
      return <Component {...props} />
    }} />
  );
}

export default PrivateRoute;