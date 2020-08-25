import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../components/App';

const serverRender = () => {

  const initialData = {
    initText: 'Hello react from server',
  };

  return {
    initialMarkup: ReactDOMServer.renderToString(
      <>
        <App initialData={initialData}/>
      </>
    ),
    initialData,
  };
};

export default serverRender;
