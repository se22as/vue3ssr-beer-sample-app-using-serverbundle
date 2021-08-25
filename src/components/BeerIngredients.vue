<template>
  <div>
    <hr />
    <div class="title">Ingredients</div>
    <div>Malt</div>
    <ul>
      <div v-for="(maltData, i) in data.malt" v-bind:key="i">
        <li key={i}>{{maltData.name}}</li>
      </div>
    </ul>

    <div>Hops</div>
    <ul>
      <div v-for="(hopsData, i) in data.hops" v-bind:key="i">
        <li key={i}>{{hopsData.name}}</li>
      </div>
    </ul>

    <div>Yeast</div>
    <ul>
      <li>{{data.yeast}}</li>
    </ul>

  </div>

</template>

<script>
export default {
  name: 'BeerIngredients',
  props: ['data'],
};
</script>
