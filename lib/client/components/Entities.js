import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../actions';

import GridView from './GridView';
import ContextMenu from './ContextMenu';
import Spinner from './Spinner';

import useEndpoitData from './useEndpoitData';

const renderContent = (
  entities,
  match,
  handleSubmit,
  handleInput,
  newEntity
) => {
  let content;
  let headers;
  switch (entities) {
    case null:
      console.info('loading...');
      return <Spinner />;
    default:
      content = entities.filter((entity) => entity.id_asset == match);
      headers = Object.keys(entities[0]).map((header) => ({
        key: header,
        label: header,
      }));
      return (
        <>
          <GridView
            json={content.length ? content : [{}]}
            headers={headers}
            handleSubmit={handleSubmit}
            handleInput={handleInput}
            formElement={newEntity}
          />
          <ContextMenu />
        </>
      );
  }
};

const Entities = (props) => {
  const { newData, handleInput, handleSubmit } = useEndpoitData(
    'Entity',
    props.entities,
    props.fetchEntities,
    props.addEntity,
    { id_asset: props.match.params.assetsId }
  );

  return (
    <>
      <h2>Entities</h2>
      <Link to="/">Back to Asstes</Link>
      {renderContent(
        props.entities,
        props.match.params.assetsId,
        handleSubmit,
        handleInput,
        newData
      )}
    </>
  );
};

const mapStatetoProps = ({ entities }) => {
  return { entities };
};

Entities.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      assetsId: PropTypes.string.isRequired,
    }),
  }),
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  fetchEntities: PropTypes.func.isRequired,
  addEntity: PropTypes.func.isRequired,
};

export default connect(mapStatetoProps, actions)(Entities);
