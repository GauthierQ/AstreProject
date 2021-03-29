<template>
  <nuxt-link class="home-button" :to="{ name: 'index' }">Home</nuxt-link>
</template>

<script>
export default {
  methods: {
    homeButton() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.home-button {
    position: absolute;
    left: 10%;
    top: 5%;
    color: #000;
    display: flex;
    border: 2px solid #000;
    padding: 1em 2em;
}

.home-button:hover {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    transition: all 0.3s;
}
</style>