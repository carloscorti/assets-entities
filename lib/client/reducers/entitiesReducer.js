import { FETCH_ENTITIES, ADD_ENTITY } from '../actions/types';

const entitiesReducer = (store = null, action) => {
  switch (action.type) {
    case FETCH_ENTITIES:
      return action.payload.entities;
    case ADD_ENTITY:
      return [...store, action.payload];
    default:
      return store;
  }
};

export default entitiesReducer;
