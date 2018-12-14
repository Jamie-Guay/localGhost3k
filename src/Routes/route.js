import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loginForm from '../components/login/loginForm';
import Landing from '../components/Landing/landing';
import signUpFrom from '../components/login/signUpForm';
// import Appliedroute from '../components/nonAPI/appliedroute';

export default ({ childProps }) => (
  <Switch>
    <Route path="/Login" exact component={loginForm} />
    <Route path="/" exact component={Landing} />
    <Route path="/Register" exact component={signUpFrom} />
    {/* <Route component={notFound} /> */}
  </Switch>
);