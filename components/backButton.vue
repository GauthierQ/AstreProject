<template>
  <nuxt-link class="back-button" :to="{ name: 'index' }">Home</nuxt-link>
</template>

<script>
export default {
  methods: {
    backButton() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.back-button {
    position: absolute;
    left: 10%;
    top: 5%;
    color: #000;
    display: flex;
    border: 2px solid #000;
    padding: 1em 2em;
}

.back-button:hover {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    transition: all 0.3s;
}
</style>