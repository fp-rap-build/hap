import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, roles = [], ...rest }) => {
  const user = useSelector(state => state.user.currentUser);

  const token = localStorage.getItem('token');

  if (!token) {
    return <Redirect to="/landing" />;
  }

  if (!roles.includes(user.role) && roles.length !== 0) {
    return <Redirect to="/landing" />;
  }

  return <Route {...rest} component={Component} />;
};

export default PrivateRoute;
