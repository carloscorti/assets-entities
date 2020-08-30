import React from 'react';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Assets from './Assets';
import Entities from './Entities';

/**
 * NotFound comoponent: to show a message in case no route defined, allway from client side
 */

const NotFound = () => {
  return (
    <>
      <h2>Not Found</h2>
      <Link to="/">Asstes</Link>
      <br />
      <Link to="/entities">Entities</Link>
    </>
  );
};

/**
 * App comoponent: App'structure, sets up router strategy and contains toasr container
 */

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={3000} hideProgressBar />
        <Switch>
          <Route path="/" component={Assets} exact />
          <Route path="/entities/:assetsId" component={Entities} exact />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
