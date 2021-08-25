/* eslint-disable no-param-reassign */
/**
 * The VUEX store containing all the data this application uses.
 */
import Vuex from 'vuex';

import { fetchAllBeers, fetchBeer, fetchRandomBeer } from '../data/data';

export default Vuex.createStore({
  // wrap state in a function so that it does not leak into other server runs
  state() {
    return {
      homePageData: {},
      beerInfoPageData: {},
      randomBeerPageData: {},
    };
  },

  actions: {
    // get the data for the home page
    fetchHomePageData({ commit }) {
      return fetchAllBeers()
        .then((data) => {
          commit('setHomePageData', data);
        });
    },

    // get the data for the Beer Info Page
    fetchBeerInfoPageData({ commit }, id) {
      return fetchBeer(id)
        .then((data) => {
          commit('setBeerInfoPageData', data);
        });
    },

    // get the data for the RandomBeer
    fetchRandomBeerPageData({ commit }) {
      return fetchRandomBeer()
        .then((data) => {
          commit('setRandomBeerPageData', data);
        });
    },
  },

  // mutations have to be synchronous.
  mutations: {
    setHomePageData(state, data) {
      state.homePageData = data;
    },

    setBeerInfoPageData(state, data) {
      state.beerInfoPageData = data;
    },

    setRandomBeerPageData(state, data) {
      state.randomBeerPageData = data;
    },
  },

});
