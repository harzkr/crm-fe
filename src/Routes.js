import React from 'react';
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";

const Routes = () => {
    return(
        <Router>
            <Route path='/login'>
                <Login/>
            </Route>
            <Route path='/'>
                <Dashboard/>
            </Route>
            <Route path='/conversation/:user'>
                <Conversation/>
            </Route>
        </Router>
    )
}

