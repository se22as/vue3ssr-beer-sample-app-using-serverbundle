<template>
  <header>
    <img class="logo" :src="logo" alt="BrewDog Logo" />

    <div>
      <div class="header-text">
        BREWDOG BEERS
      </div>

      <nav>
        <ul>
          <li v-on:click="onMenuItemClicked(0)">
            <router-link
              :class="currentPageIndex===0 ? 'active' : '' "
              style="text-decoration: none;"
              :to="{ name: 'home'}">
            Beers
            </router-link>
          </li>
          <li v-on:click="onMenuItemClicked(1)">
            <router-link
              :class="currentPageIndex===1 ? 'active' : '' "
              style="text-decoration: none;"
              :to="{ name: 'randomBeer'}">
              Random-Beer
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

  </header>
</template>

<script>
import logo from '../assets/logo.png';

export default {

  data() {
    return {
      logo,
      currentPageIndex: Number,
    };
  },

  created() {
    this.currentPageIndex = (this.$route.name === 'randomBeer') ? 1 : 0;
  },

  methods: {
    /*
     * Handle an item being clicked on from the menu
     */
    onMenuItemClicked(index) {
      // set the current nav index
      this.currentPageIndex = index;
    },

  },
};
</script>

<style scoped>
  header {
    background-color: #009bc9;
    color: white;
    padding: 10px;
    display: flex;
    flex-direction: row;
  }

  header .logo {
    height: 60px;
    width:auto;
    margin-right: 20px;
  }

  .header-text {
    color: black;
    font-weight: bold;
    font-size: x-large;
    padding-left: 16px;
  }

  /* Nav menu items are a horizontal list (flex=row) with no bullets visible */
  nav ul {
    list-style-type: none;
    display:flex;
    flex-flow: row wrap; /* flex-direction flex-wrap */
    padding: 0;
    margin: 0;
  }
  nav li {
    color: white;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 18px;
    font-weight: bold;
  }
  nav li a {
    color: white;
    cursor: pointer;
  }
  nav li a:hover {
    color:#e1fa00;
  }
  nav li a.active {
    color: #C0D600;
  }
  nav li a.active:hover {
    color: #e1fa00;
  }
</style>
