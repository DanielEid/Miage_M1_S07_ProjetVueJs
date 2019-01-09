<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.API.getRandomMenus();
  },
  data() {
    return {};
  }
};
</script>

<style scoped>