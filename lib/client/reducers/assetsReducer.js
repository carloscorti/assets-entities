import { FETCH_ASSETS } from '../actions/types';

const assetsReducer = (store = null, action) => {
  console.info(action);
  switch (action.type) {
    case FETCH_ASSETS:
      return action.payload || false;
    default:
      return store;
  }
};

export default assetsReducer;
