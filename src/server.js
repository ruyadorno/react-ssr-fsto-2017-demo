import React from 'react';
import express from 'express';
import got from 'got';
import { renderToString } from 'react-dom/server';

import Home from './Home';
import Lib from './Lib';

function isProd() {
  return process.env.NODE_ENV === 'production';
}

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const mockServer = 'http://localhost:8059';

const routes = {
  '/': {
    endpoint: () => isProd()
      ? 'https://api.cdnjs.com/libraries'
      : `${mockServer}/libraries`,
    component: Home
  },
  '/libs': {
    endpoint: name => isProd()
      ? `https://api.cdnjs.com/libraries/${name}`
      : `${mockServer}/libraries/${name}`,
    component: Lib
  },
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use('/libs/:name', (req, res, next) => {
    req.key = '/libs';
    req.keyName = req.params.name;
    next();
  })
  .use((req, res, next) => {
    got(routes[req.key || req.url].endpoint(req.keyName), { json: true })
      .then(data => {
        req.props = data.body;
        next();
      })
      .catch(next);
  })
  .use((req, res, next) => {
    const Component = routes[req.key || req.url].component;
    req.markup = renderToString(
      <Component {...req.props} />
    );
    next();
  })
  .get('/*', (req, res) => {
    res.status(200).send(
      `<!doctype html>
  <html lang="">
  <head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''}
      <script>
        window.store = JSON.parse('${JSON.stringify(req.props)}');
      </script>
      ${isProd()
        ? `<script src="${assets.client.js}"></script>`
        : `<script src="${assets.client.js}" crossorigin></script>`}
  </head>
  <body>
      <div id="root">${req.markup}</div>
  </body>
</html>`
    );
  });

export default server;
