import { FETCH_ASSETS, ADD_ASSET } from '../actions/types';

const assetsReducer = (store = null, action) => {
  switch (action.type) {
    case FETCH_ASSETS:
      return action.payload.assets;
    case ADD_ASSET:
      return [...store, action.payload];
    default:
      return store;
  }
};

export default assetsReducer;
