<template>
  <div>
    <v-hover>
      <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
        <v-btn color="blue" dark small absolute right top fab v-show="hover" @click="goToDetail()">
          <v-icon>add</v-icon>
        </v-btn>
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
          <v-btn color="yellow" @click="updateRestaurant()">Modifier</v-btn>
          <v-btn color="red" @click="deleteRestaurant()">Supprimer</v-btn>
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
          this.$emit("reload-restaurants");
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToDetail() {
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
      this.image =
        "https://www.mychefcom.com/hs-fs/hubfs/Mychefcom/images/BLOG/Header-Blog/photo-culinaire-pexels.jpg?width=954&height=636&name=photo-culinaire-pexels.jpg";
    
    },
    onLoadImageError() {
      this.image =
        "https://www.mychefcom.com/hs-fs/hubfs/Mychefcom/images/BLOG/Header-Blog/photo-culinaire-pexels.jpg?width=954&height=636&name=photo-culinaire-pexels.jpg";
    }
  }
};
</script>


<style scoped>
.headline {
  background-color: white;
}
</style>