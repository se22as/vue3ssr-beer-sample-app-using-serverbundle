<template>
  <!-- Display spinner whilst data is loading (client side rendering only) -->
  <div v-if="loading">
    <div class="progress-spinner" />
  </div>
  <div v-else>
    <Layout>
      <div class="page-container">
        <div class="page-title">
          Beer List
        </div>

        <div v-for="(beer, i) in beers" v-bind:key="i">
          <BeerSummary key={i} :beerInfo=beer />
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
// import any components this page uses here
import Layout from '../components/Layout.vue';
import BeerSummary from '../components/BeerSummary.vue';

export default {
  name: 'HomePage',

  components: {
    Layout,
    BeerSummary,
  },

  data() {
    return {
      // client side rendering only
      loading: false,
    };
  },

  // computed properties will watch for any changes in the data within it,
  // when it changes it will update itself based on some function
  computed: {
    beers() {
      return this.$store.state.homePageData.beers;
    },
  },

  // Server-side only: called by server renderer automatically
  serverPrefetch() {
    return this.fetchData();
  },

  // Client-side only : get data if its not already been obtained
  mounted() {
    document.title = 'Beers';
    if (!this.beers) {
      this.loading = true;
      this.fetchData()
        .then(() => {
          this.loading = false;
        });
    }
  },

  methods: {
    fetchData() {
      // return the Promise from the action
      return this.$store.dispatch('fetchHomePageData');
    },
  },

};
</script>
