import axios from 'axios';

const fetchDataController = (httpEndpoint) => async (req, res) => {
  try {
    const fetch = await axios.get(httpEndpoint);
    return res.json(fetch.data);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

export default fetchDataController;
