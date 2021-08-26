/* eslint-disable no-param-reassign */
/**
 * Server starting point, a simple Express Server.
 */
import 'core-js'; // replacement for babel-polyfill in babel 7.4 & above
import 'regenerator-runtime/runtime'; // replacement for babel-polyfill in babel 7.4 & above

import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import express from 'express';
import serialize from 'serialize-javascript';
import { renderToString } from '@vue/server-renderer';
import buildApp from '../app';

// parse the .env file
dotenv.config();

// Create the express app.
const server = express();

// open all the img/js/css folders and favicon file in the "dist" directory to the outside world
const clientDistPath = './dist/client';
server.use('/img', express.static(path.join('./', clientDistPath, 'img')));
server.use('/js', express.static(path.join('./', clientDistPath, 'js')));
server.use('/css', express.static(path.join('./', clientDistPath, 'css')));
server.use('/favicon.png', express.static(path.join('./', clientDistPath, 'favicon.png')));

/*
 * Create a single route handler to listen to all (*) routes of our application
 */
server.get('*', async (req, res) => {
  // create the root app, router and vuex store
  const { app, router, store } = await buildApp(req.url);

  // wait for the router to be ready
  router.push(req.url);
  await router.isReady();

  // get the application content for the current route
  const appContent = await renderToString(app);

  // read the index.html template file
  fs.readFile(path.join('./', clientDistPath, 'index.html'), (err, html) => {
    if (err) {
      throw err;
    }

    // Serialize out the Vuex Store
    const storeData = serialize(store.state);
    const renderState = `
      <script>
        window.INITIAL_DATA = ${storeData}
      </script>`;

    // replace the app tag in the HTML with the app content string and serialized data
    html = html.toString().replace(
      '<div id="app"></div>',
      `<div id="app">${appContent}</div>${renderState}`,
    );

    // set any headers on the response before returning
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });
});

const port = process.env.PORT || 80;
server.listen(port, () => {
  console.log(`Application is accesssible on : http://localhost:${port}`);
});
