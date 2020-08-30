import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../actions';

import GridView from './GridView';
import Spinner from './Spinner';

import useEndpoitData from './useEndpoitData';

/**
 * Function renderContent: depending on assets arg, displays assets grid view
 * or spinner if assets=null
 *
 * @param  {Array}    assets        assets to display grid, headers are seted regarding the first object of this param
 * @param  {Function} handleSubmit  manage submit for new rows on GridView component
 * @param  {Function} handleInput   manage input content for submit new rows on GridView component
 * @param  {object} newAsset        sets value for inputs row on GridView component
 * @return {jsx}                    jsx snippet to render in each case
 */

const renderContent = (assets, handleSubmit, handleInput, newAsset) => {
  let headers;
  switch (assets) {
    case null:
      console.info('loading...');
      return <Spinner />;

    default:
      // setting headers to GridView
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

/**
 * Assets comoponent: Displays Assets grid, it can add new assets to redux store, uses assets store,
 * fetchAssets action and addAsset action from redux, uses useEndpoitData custom hook to manage state
 *
 * @props  {Array}     assets       json with assets to display from redux store, element id is required for json objects
 * @props  {Function}  fetchAssets  action to fetch assets from backend endpoint, from redux actions, is required
 * @props  {Function}  addAsset     action to add new asset to assets redux store, from redux actions, is required
 */

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
