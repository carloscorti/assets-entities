import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../actions';

const renderContent = (assets) => {
  let headers;
  switch (assets) {
    case null:
      return;
    default:
      headers = Object.keys(assets[0]).map((header) => ({
        key: header,
        label: header,
      }));

      return (
        <>
          <table className="table">
            <thead>
              <tr>
                {headers.map((header) => {
                  return <th key={header.key}>{header.label}</th>;
                })}
                <th>Go to Entities</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => {
                return (
                  <tr key={asset.id}>
                    {headers.map((element) => {
                      return (
                        <td key={`${element.key}_${asset[element.key]}`}>
                          {asset[element.key]}
                        </td>
                      );
                    })}
                    <td>
                      <Link to={`/entities/${asset.id}`}>Entities</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      );
  }
};

const Assets = (props) => {
  useEffect(() => {
    props.fetchAssets();
  }, []);

  return (
    <>
      <h2>Assets</h2>
      <Link to="/entities">Entities</Link>
      {renderContent(props.assets)}
    </>
  );
};

const mapStatetoProps = ({ assets }) => {
  return { assets };
};

export default connect(mapStatetoProps, actions)(Assets);
