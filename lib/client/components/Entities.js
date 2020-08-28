import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../actions';
import GridView from './GridView';
import ContextMenu from './ContextMenu';

const renderContent = (entities, match) => {
  let content;
  switch (entities) {
    case null:
      console.info('loading...');
      return;
    default:
      content =
        match > 0
          ? entities.filter((entitie) => entitie.id_asset == match)
          : entities;
      return (
        <>
          <GridView json={content} />
          <ContextMenu />
        </>
      );
  }
};

const Entities = (props) => {
  useEffect(() => {
    (async () => {
      if (props.entities) {
        return;
      }
      console.info('api call for entities');
      await props.fetchEntities();
    })();
  }, []);

  return (
    <>
      <h2>Entities</h2>
      <Link to="/">Back to Asstes</Link>
      {renderContent(props.entities, props.match.params.assetsId)}
    </>
  );
};

const mapStatetoProps = ({ entities }) => {
  return { entities };
};

export default connect(mapStatetoProps, actions)(Entities);
