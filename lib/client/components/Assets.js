import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import GridView from './GridView';

const renderContent = (assets) => {
  switch (assets) {
    case null:
      console.info('loading...');
      return;
    default:
      return <GridView json={assets} linkCell="entities" />;
  }
};

const Assets = (props) => {
  useEffect(() => {
    (async () => {
      if (props.assets) {
        return;
      }
      console.info('api call for assets');
      await props.fetchAssets();
    })();
  }, []);

  return (
    <>
      <h2>Assets</h2>
      {renderContent(props.assets)}
    </>
  );
};

const mapStatetoProps = ({ assets }) => {
  return { assets };
};

export default connect(mapStatetoProps, actions)(Assets);
