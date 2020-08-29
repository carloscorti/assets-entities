import axios from 'axios';

import { FETCH_ASSETS, FETCH_ENTITIES } from '../actions/types';

export const fetchAssets = () => async (dispatch) => {
  const fetchRes = await axios.get('/api/v1/assets');

  dispatch({
    type: FETCH_ASSETS,
    payload: fetchRes.data,
  });
};

export const fetchEntities = () => async (dispatch) => {
  const fetchRes = await axios.get('/api/v1/entities');

  dispatch({
    type: FETCH_ENTITIES,
    payload: fetchRes.data,
  });
};

// export const addEntities = (entity) => (dispatch) => {

//   dispatch({
//     type: ADD_ENTITY,
//     payload: entity,
//   });
// };
