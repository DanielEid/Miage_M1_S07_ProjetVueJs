<template>
  <div id="app">
    <v-app>
      <!-- point d'entré -->
      <router-view
        v-on:reload-restaurants="reloadRestaurants"
        :datasRestaurants="{restaurants: restaurants, nbRestaurants: nbRestaurants}"
        :numberOfPages="numberOfPages"
      ></router-view>

      <!--Cart-->
      <app-cart></app-cart>

      <!--Footer-->
      <v-footer dark height="auto">
        <v-card class="flex" flat tile>
  
        </v-card>
      </v-footer>
    </v-app>
  </div>
</template>

<script>


export default {
  name: "app",
  data() {
    return {
      restaurants: [],
      nbRestaurants: 0,
      numberOfPages: 1,
      loading: true,
      cartActivated: false
    };
  },
  mounted() {
    this.reloadRestaurants();
  },
  methods: {
    reloadRestaurants(page = 1, pageSize = 10) {
      console.log("i'm reloading - App");
      console.log("page: " + page);

      this.API.getRestaurants(page - 1, pageSize)
        .then(result => {
          this.restaurants = result.data;
          this.nbRestaurants = result.count;
          this.numberOfPages = Math.round((this.nbRestaurants - 1) / pageSize);
        })
        .catch(err => {
          console.log(err);
        });

       
    },

  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
  background-color: #0e0e0e;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
