import React from 'react';

import '../styles/spinner.css';

/**
 * Spinner comoponent: Displays Spinner component
 *
 */

const Spinner = () => {
  return (
    <>
      <div className="spinner-container">
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
