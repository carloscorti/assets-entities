import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../actions';
import GridView from './GridView';

const renderContent = (entities, match) => {
  let content;
  switch (entities) {
    case null:
      console.log('loading...');
      return;
    default:
      content =
        match > 0
          ? entities.filter((entitie) => entitie.id_asset == match)
          : entities;
      return <GridView json={content} />;
  }
};

const Entities = (props) => {
  useEffect(() => {
    if (props.entities) {
      return;
    }
    console.log('api call for entities');
    props.fetchEntities();
  }, []);

  return (
    <>
      <>
        <h2>Entities</h2>
        <Link to="/">Back to Asstes</Link>
      </>
      {renderContent(props.entities, props.match.params.assetsId)}
    </>
  );
};

const mapStatetoProps = ({ entities }) => {
  return { entities };
};

export default connect(mapStatetoProps, actions)(Entities);
