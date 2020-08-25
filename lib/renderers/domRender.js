/**
 * Starting point for react application
 */

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';

// Grab initial state from a global variable injected into the server-generated HTML
const initialData = window.initialData;

// Allow the passed state to be garbage-collected
delete window.initialData;

//.hydrate() for server side rendering the App with redux conected
ReactDOM.hydrate(
  <>
    <App initialData={initialData}/>
  </>,
  document.getElementById('root')
);
