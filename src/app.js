import { createSSRApp, createApp } from 'vue';
import App from './pages/App.vue';

import router from './router';
import store from './vuex';

const isSSR = typeof window === 'undefined';

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export default function buildApp() {
  const app = (isSSR ? createSSRApp(App) : createApp(App));

  app.use(router);
  app.use(store);

  return { app, router, store };
}
