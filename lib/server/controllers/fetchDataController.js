import axios from 'axios';

/**
 * Function fetchDataController (apiRouter controller): handles http request to data endpoint
 *
 * @param  {string}  httpEndpoint  http string endpoit to fetch data
 * @return {object}  res           response object with succesfull or bad request info
 */
const fetchDataController = (httpEndpoint) => async (req, res) => {
  try {
    const fetch = await axios.get(httpEndpoint);
    return res.json(fetch.data);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export default fetchDataController;
