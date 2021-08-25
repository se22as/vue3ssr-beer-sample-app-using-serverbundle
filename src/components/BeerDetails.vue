<template>
  <div class="page-container">

    <div class="page-title">{{beer.name}}</div>

    <div>
      <div class="page-content">
        <img class="beer-image" :src=beer.image_url alt="Beer Bottle"/>

        <div class="beer-details">
          <div class="title">Tag Line</div>
          <div>{{beer.tagline}}</div>

          <div class="title">Description</div>
          <div>{{beer.description}}</div>

          <div class="title">First Brewed</div>
          <div>{{beer.first_brewed}}</div>

          <div class="title">Food Pairing</div>
          <ul>
            <div v-for="(food, i) in beer.food_pairing" v-bind:key="i">
              <li key={i}>{{food}}</li>
            </div>
          </ul>

        </div>
      </div>

      <div>
        <BeerIngredients :data=beer.ingredients />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeerDetails',
  props: ['beer'],
};
</script>

<style scoped>
  .page-content {
    display: flex;
    flex-direction: row;
  }

  .beer-details {
    margin-left: 50px;
  }

  .beer-image {
    height: 400px;
    width:auto;
  }

  .beer-tagline {
    font-style: italic;
  }
</style>
