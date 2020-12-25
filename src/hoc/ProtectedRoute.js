import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {props.isAuth ? <Component {...props} /> : <Redirect to="/sign-in" />}
  </Route>
);

export default ProtectedRoute;
