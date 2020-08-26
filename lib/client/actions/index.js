import axios from 'axios';

import { FETCH_ASSETS } from '../actions/types';

export const fetchAssets = () => async (dispatch) => {
  const fetchRes = await axios.get('/api/v1/assets');

  dispatch({
    type: FETCH_ASSETS,
    payload: fetchRes.data,
  });
};
