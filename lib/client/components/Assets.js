import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../actions';

import GridView from './GridView';
import Spinner from './Spinner';

import useEndpoitData from './useEndpoitData';

const renderContent = (assets, handleSubmit, handleInput, newAsset) => {
  let headers;
  switch (assets) {
    case null:
      console.info('loading...');
      return <Spinner />;

    default:
      headers = Object.keys(assets[0]).map((header) => ({
        key: header,
        label: header,
      }));
      return (
        <GridView
          json={assets}
          headers={headers}
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          linkCell="entities"
          formElement={newAsset}
        />
      );
  }
};

const Assets = (props) => {
  const { newData, handleInput, handleSubmit } = useEndpoitData(
    'Asset',
    props.assets,
    props.fetchAssets,
    props.addAsset
  );

  return (
    <>
      <h2>Assets</h2>
      {renderContent(props.assets, handleSubmit, handleInput, newData)}
    </>
  );
};

const mapStatetoProps = ({ assets }) => {
  return { assets };
};

Assets.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  fetchAssets: PropTypes.func.isRequired,
  addAsset: PropTypes.func.isRequired,
};

export default connect(mapStatetoProps, actions)(Assets);
