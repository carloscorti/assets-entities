import express from 'express';
import config from './config';
import path from 'path';
import serverRender from '../renderers/serverRenderer';
import assets from '../../public/assets.json';

import apiRouter from './routes/apiRouter';

const app = express();

app.use(express.static('public'));

app.set('views', path.join(__dirname, './', 'views'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const { initialMarkup, initialData } = serverRender();

  res.render('index', {
    title: 'ExcelSense',
    initialMarkup,
    initialData,
    assets,
  });
});

app.use('/api/v1', apiRouter());

app.use((req, res) => {
  res.status(404).send('Sorry cant find that!<br><a href="/">go back</a>');
});

app.listen(config.port, () => {
  console.info(`Running on port ${config.port}...`);
});
