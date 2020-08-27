import { FETCH_ENTITIES } from '../actions/types';

const assetsReducer = (store = null, action) => {
  // console.info(action);
  switch (action.type) {
    case FETCH_ENTITIES:
      return action.payload.entities;
    default:
      return store;
  }
};

export default assetsReducer;
