<!-- Main starting page for the Vue application
     The router will replace the "router-view" component with the required component
     The div with the id of "app" is needed for client side hydration.
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
};
</script>

<style>
  body {
    font-family: -apple-system, "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    margin: 0px;
  }

  .page-container {
    padding: 16px;
    display: flex;
    flex-direction: column;
  }

  .page-title {
    font-weight: bold;
    font-size: x-large;
    align-self: center;
  }

  .title {
    font-weight: bold;
    padding-top: 20px;
  }
</style>
