<template>
  <div>
    <v-hover>
      <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
        <v-btn color="blue" dark small absolute right top fab v-show="hover" @click="goToDetail()">
          <v-icon>add</v-icon>
        </v-btn>
        <v-img :src="image" aspect-ratio="2.75" @load="onLoadImage" @error="onLoadImageError">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{name}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title primary-title>
          <div>
            <div>{{cuisine}}</div>
          </div>
        </v-card-title>
        <div class="d-flex">
          <v-rating
            :value="parseFloat(gradeAverage())"
            color="amber"
            dense
            half-increments
            readonly
            size="20"
          ></v-rating>
          <div class="ml-2 grey--text text--darken-2">
            <span>{{gradeAverage()}}</span>
            <span>({{ grades.length }})</span>
          </div>
        </div>

        <v-card-actions>
          <v-btn flat color="info" @click="updateRestaurant()">Modifier</v-btn>
          <v-btn flat color="error" @click="deleteRestaurant()">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "cuisine", "grades", "image"],
  data() {
    return {};
  },
  methods: {
    updateRestaurant() {},
    deleteRestaurant() {
      this.API.deleteRestaurant(this.id)
        .then(result => {
          console.log(result);
          console.log("dans then Restaurant");
          this.$emit("reload-restaurants");
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToDetail() {
      console.log(this.image);
      localStorage["image"] = this.image;
      this.$router.push({
        name: "detail",
        params: {
          id: this.id
        }
      });
    },
    gradeAverage() {
      var total = 0;
      this.grades.forEach(element => {
        total = total + parseInt(element.score);
      });
      return (total / this.grades.length / 4).toFixed(2);
    },
    onLoadImage() {
      console.log("loading image...");
    },
    onLoadImageError() {
      console.log("failed loading image...");
      this.image =
        "https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg";
    }
  }
};
</script>

/**
scoped = ne se s'applique pas aux composants inclus
 */
<style scoped>
.headline {
  background-color: white;
}
</style>