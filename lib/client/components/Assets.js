import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../actions';

const Assets = (props) => {
  useEffect(() => {
    props.fetchAssets();
  }, []);

  console.info(props.assets);

  return (
    <>
      <h2>Assets</h2>
      <Link to="/entities">Entities</Link>
    </>
  );
};

const mapStatetoProps = ({ assets }) => {
  return { assets };
};

export default connect(mapStatetoProps, actions)(Assets);
