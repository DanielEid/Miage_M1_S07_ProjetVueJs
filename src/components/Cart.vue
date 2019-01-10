<template>
  <div>
    <v-bottom-sheet v-model="activated">
      <v-list>
        <v-subheader>Open in</v-subheader>
       
      </v-list>
    </v-bottom-sheet>
    <v-btn fixed dark fab bottom right color="green" @click="activated=!activated">
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