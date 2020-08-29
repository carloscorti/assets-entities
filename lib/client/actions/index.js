import axios from 'axios';

import {
  FETCH_ASSETS,
  FETCH_ENTITIES,
  ADD_ASSET,
  ADD_ENTITY,
} from '../actions/types';

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

export const addAsset = (asset) => (dispatch) => {
  dispatch({
    type: ADD_ASSET,
    payload: asset,
  });
};

export const addEntity = (entity) => (dispatch) => {
  dispatch({
    type: ADD_ENTITY,
    payload: entity,
  });
};
