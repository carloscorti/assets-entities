import { combineReducers } from 'redux';
import assetsReducer from './assetsReducer';
import entitiesReducer from './entitiesReducer';

export default combineReducers({
  assets: assetsReducer,
  entities: entitiesReducer,
});
