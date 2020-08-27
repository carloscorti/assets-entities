import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import GridView from './GridView';

const renderContent = (assets) => {
  switch (assets) {
    case null:
      console.log('loading...');
      return;
    default:
      return <GridView json={assets} linkCell="entities" />;
  }
};

const Assets = (props) => {
  useEffect(() => {
    if (props.assets) {
      return;
    }
    console.log('api call for assets');
    props.fetchAssets();
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
