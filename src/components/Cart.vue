<template>
  <div>
    <v-bottom-sheet v-model="activated">
      <v-list>
        <v-subheader>Open in</v-subheader>
       
      </v-list>
    </v-bottom-sheet>
    <v-btn dark top color="blue" @click="activated=!activated">
	
      <v-icon>shopping_cart</v-icon>
	  Vottre panier
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