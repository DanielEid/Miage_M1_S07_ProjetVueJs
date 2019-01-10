<template>
  <div>
    <v-container>
      <div class="text-xs-center">
        
        
        <v-slider
          v-model="pageSize"
          color="black"
          label="Affichage des restaurants"
          hint="Nombre de restaurantsqu'il faut afficher"
          min="1"
          max="50"
		  
          :step="5"
          thumb-label
          @change="reload()"
        ></v-slider>
      </div>
      <v-flex>
        <v-card>
          <v-container v-bind="{ [`grid-list-xl`]: true }" fluid>
            <v-layout row wrap>
              <v-flex
                v-for="restaurant, index of datasRestaurants.restaurants"
                xs12
                :key="restaurant._id"
              >
                <app-restaurant
                  :id="restaurant._id"
                  :name="restaurant.name"
                  :cuisine="restaurant.cuisine"
                  v-on:reload-restaurants="reload()"
                  :grades="restaurant.grades"
               
                ></app-restaurant>
              </v-flex>
            </v-layout>
          </v-container>
		  
        </v-card>
		
      </v-flex>

	  <v-pagination
          v-model="page"
          rectangle
		  color="green"
          :length="numberOfPages"
          @input="reload()"
          :total-visible="9"
        ></v-pagination>
    </v-container>
	
  </div>
</template>

<script>
import Restaurant from "./Restaurant.vue";
import Utils from "../Utils.js";

export default {
  props: ["datasRestaurants", "numberOfPages"],
  data() {
    return {
      userName: "toto",
      page: 1,
      pageSize: 10
    };
  },
  components: {
    "app-restaurant": Restaurant
  },
  methods: {
    reload() {
      this.$emit("reload-restaurants", this.page, this.pageSize);
    },

    inputPagination() {
    }
  }
};
</script>

<style scoped>
p {
  font-style: italic;
  color: red;
}
</style>