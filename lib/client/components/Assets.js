import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import { toast } from 'react-toastify';

import GridView from './GridView';

const renderContent = (assets, handleSubmit, handleInput, newAsset) => {
  let headers;
  switch (assets) {
    case null:
      console.info('loading...');
      return;
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
  const [newAsset, setNewAsset] = useState({});

  useEffect(() => {
    (async () => {
      if (props.assets) {
        return;
      }
      console.info('api call for assets');
      await props.fetchAssets();
    })();
  }, []);

  const handleInput = (e) => {
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAssetId = Math.max(...props.assets.map((asset) => asset.id));
    props.addAsset({ id: newAssetId + 1, ...newAsset });
    setNewAsset({});
    toast.success('Asset saved :)¡¡¡¡');
  };

  return (
    <>
      <h2>Assets</h2>
      {renderContent(props.assets, handleSubmit, handleInput, newAsset)}
    </>
  );
};

const mapStatetoProps = ({ assets }) => {
  return { assets };
};

export default connect(mapStatetoProps, actions)(Assets);
