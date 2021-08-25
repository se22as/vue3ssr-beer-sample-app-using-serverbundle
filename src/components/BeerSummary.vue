<template>

  <div>
    <ul>
      <li>
        <router-link :to="{ name: 'beer', params: {id: beerInfo.id}}">
          {{beerInfo.name}}
        </router-link>
        <div class="beer-tagline">
          {{beerInfo.tagline}}
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'BeerSummary',
  props: ['beerInfo'],
};
</script>

<style scoped>
  .beer-tagline {
    font-style: italic;
  }
</style>
