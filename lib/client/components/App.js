import React from 'react';

/**
 * App comoponent: App'structure, takes store state and action from redux as props
 * and passes necesary data to each children
 */

const App = (props) => {

  return (
    <>
      <h1 >{props.initialData.initText}
      </h1>
    </>
  );


};

export default App;
