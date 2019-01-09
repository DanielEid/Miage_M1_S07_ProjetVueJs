<template>
  <div>
    <v-bottom-sheet v-model="activated">
      <v-list>
        <v-subheader>Open in</v-subheader>
        <!--v-list-tile v-for="tile in tiles" :key="tile.title" @click="showCart = false">
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                :alt="tile.title"
              >
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>!-->
      </v-list>
    </v-bottom-sheet>
    <!-- Button shopping cart-->
    <v-btn fixed dark fab bottom right color="blue" @click="activated=!activated">
      <v-icon>shopping_cart</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      activated: false
    };
  }
};
</script>

<style scoped>
</style>