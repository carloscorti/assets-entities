import React from 'react';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

/**
 * App comoponent: App'structure, takes store state and action from redux as props
 * and passes necesary data to each children
 */
const Assets = () => {
  return (
    <>
      <h2>Assets</h2>
      <Link to="/entities">Entities</Link>
    </>
  );
};
const Entities = () => {
  return (
    <>
      <h2>Entities</h2>
      <Link to="/">Asstes</Link>
    </>
  );
};

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

const App = (props) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Assets} exact />
          <Route path="/entities" component={Entities} exact />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
