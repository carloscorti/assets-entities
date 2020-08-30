import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../actions';

import GridView from './GridView';
import ContextMenu from './ContextMenu';
import Spinner from './Spinner';

import useEndpoitData from './useEndpoitData';

/**
 * Function renderContent: depending on entities arg, displays entities grid view filtered by id_asset match
 * or spinner if entities=null
 *
 * @param  {Array}    entities      entities to display grid regarding entity.id_asset match,
 *  headers are seted regarding the first object of this param
 * @param  {string}   match         param to filter entities by id_asset
 * @param  {Function} handleSubmit  manage submit for new rows on GridView component
 * @param  {Function} handleInput   manage input content for submit new rows on GridView component
 * @param  {object}   newEntity     sets value for inputs row on GridView component
 * @return {jsx}                    jsx snippet to render in each case
 */

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
      // setting content to GridView
      content = entities.filter((entity) => entity.id_asset == match);
      // setting headers to GridView
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

/**
 * Entities comoponent: Displays Entities grid, it can add new entities to redux store, uses entities store,
 * fetchEntities action and addEntity action from redux, uses useEndpoitData custom hook to manage state
 *
 * @props  {Array}     entities      json with entities to display from redux store, element id is required for json objects
 * @props  {Function}  fetchEntities action to fetch entities from backend endpoint, from redux actions, is required
 * @props  {Function}  addEntity     action to add new entity to assets redux store, from redux actions, is required
 * @props  {string}    match.params.assetsId     query url param to display entities by id_asset. provided by react router
 */

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
