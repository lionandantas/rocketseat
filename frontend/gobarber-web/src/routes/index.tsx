import React from "react";
import SignIn from "../pages/Signin";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import { Switch } from "react-router-dom";
import Router from './Router';

const Routes: React.FC = () => (
  <Switch>
    <Router path="/" exact component={SignIn} />
    <Router path="/signup"  component={SignUp} />
    <Router path="/dashboard"  component={Dashboard} isPrivate />
  </Switch>
);
export default Routes;
