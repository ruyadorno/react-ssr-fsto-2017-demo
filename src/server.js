import React from 'react';
import express from 'express';
import got from 'got';
import { renderToString } from 'react-dom/server';

import Home from './Home';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const mockServer = 'http://localhost:8059';

const routes = {
  '/': {
    endpoint: process.env.NODE_ENV === 'production'
      ? 'https://api.cdnjs.com/libraries'
      : `${mockServer}/libraries`,
    component: Home
  }
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use((req, res, next) => {
    got(routes[req.url].endpoint, { json: true })
      .then(data => {
        req.props = data.body;
        next();
      })
      .catch(next);
  })
  .use((req, res, next) => {
    const Component = routes[req.url].component;
    req.markup = renderToString(
      <Component data={req.props} />
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
      ${process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`}
  </head>
  <body>
      <div id="root">${req.markup}</div>
  </body>
</html>`
    );
  });

export default server;
