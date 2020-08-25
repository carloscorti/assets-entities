import express from 'express';
import fetchDataController from '../controllers/fetchDataController';

const apiRouter = () => {
  const router = express.Router();

  router.route('/').get((req, res) => res.send({ api: 'version1' }));

  router
    .route('/assets')
    .get(
      fetchDataController(
        'https://6y458uslg3.execute-api.eu-west-3.amazonaws.com/elixos/assets'
      )
    );

  router
    .route('/entities')
    .get(
      fetchDataController(
        'https://6y458uslg3.execute-api.eu-west-3.amazonaws.com/elixos/entities'
      )
    );

  return router;
};

export default apiRouter;
