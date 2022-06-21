import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Conversation from "./components/Conversation";

const Routes = () => {
  return (
    <Router>
      <div>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
        <Route path="/conversation/:user">
          <Conversation />
        </Route>
      </div>
    </Router>
  );
};

export default Routes;
