<template>
  <!-- Display spinner whilst data is loading (client side rendering only) -->
  <div v-if="loading">
    <div class="progress-spinner" />
  </div>
  <div v-else>
    <Layout>
      <BeerDetails :beer=beer />
    </Layout>
  </div>
</template>

<script>
// import any components this page uses here
import Layout from '../components/Layout.vue';
import BeerDetails from '../components/BeerDetails.vue';

export default {
  name: 'Beer',

  components: {
    Layout,
    BeerDetails,
  },

  data() {
    return {
      // client side rendering only
      loading: true,
    };
  },

  created() {
    // get data passed in on the URL
    this.id = this.$route.params.id;
  },

  // computed properties will watch for any changes in the data within it,
  // when it changes it will update itself based on some function
  computed: {
    beer() {
      return this.$store.state.beerInfoPageData.beer;
    },
  },

  // Server-side only: called by server renderer automatically
  serverPrefetch() {
    return this.fetchData();
  },

  // Client-side only : get data if its not already been obtained
  mounted() {
    document.title = 'Random Beer';
    if (this.$store.state.beerInfoPageData.id !== this.id
        || !this.beer) {
      this.loading = true;
      this.fetchData()
        .then(() => {
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  },

  methods: {
    fetchData() {
      // return the Promise from the action
      return this.$store.dispatch('fetchBeerInfoPageData', this.id);
    },
  },

};
</script>
