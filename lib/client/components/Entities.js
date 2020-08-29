import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { toast } from 'react-toastify';

import * as actions from '../actions';

import GridView from './GridView';
import ContextMenu from './ContextMenu';

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
      return;
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
  const [newEntity, setNewEntity] = useState({
    id_asset: props.match.params.assetsId,
  });

  useEffect(() => {
    (async () => {
      if (props.entities) {
        return;
      }
      console.info('api call for entities');
      await props.fetchEntities();
    })();
  }, []);

  const handleInput = (e) => {
    setNewEntity({ ...newEntity, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntityId = Math.max(...props.entities.map((entity) => entity.id));
    props.addEntity({ id: newEntityId + 1, ...newEntity });
    setNewEntity({ id_asset: props.match.params.assetsId });
    toast.success('Entity saved :)¡¡¡¡');
  };

  return (
    <>
      <h2>Entities</h2>
      <Link to="/">Back to Asstes</Link>
      {renderContent(
        props.entities,
        props.match.params.assetsId,
        handleSubmit,
        handleInput,
        newEntity
      )}
    </>
  );
};

const mapStatetoProps = ({ entities }) => {
  return { entities };
};

export default connect(mapStatetoProps, actions)(Entities);
