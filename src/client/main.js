/**
 * Entry point for the client side application.
 *
 * "webpack.client.config.js" is where this file is specified as the client side entry point.
 */
import 'core-js'; // replacement for babel-polyfill in babel 7.4 & above
import 'regenerator-runtime/runtime'; // replacement for babel-polyfill in babel 7.4 & above

import buildApp from '../app';

const { app, router, store } = buildApp();

// Initialize the client store state with the data injected from the server
const storeInitialState = window.INITIAL_DATA;
if (storeInitialState) {
  store.replaceState(storeInitialState);
}

router.isReady()
  .then(() => {
    app.mount('#app', true);
  });
