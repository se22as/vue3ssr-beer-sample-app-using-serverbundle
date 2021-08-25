/**
 * This file defines the factory function used to create the router.
 */
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import BeerInfo from '../pages/BeerInfo.vue';
import RandomBeer from '../pages/RandomBeer.vue';

const isServer = typeof window === 'undefined';
let history;
if (process.env.BASE_URL && !(process.env.BASE_URL === '/')) {
  history = isServer
    ? createMemoryHistory(process.env.BASE_URL)
    : createWebHistory(process.env.BASE_URL);
} else {
  history = isServer ? createMemoryHistory() : createWebHistory();
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/beer/:id',
    name: 'beer',
    component: BeerInfo,
  },
  {
    path: '/randomBeer',
    name: 'randomBeer',
    component: RandomBeer,
  },
];

// Create the router for the routes
const router = createRouter({
  history,
  routes,
});

export default router;
