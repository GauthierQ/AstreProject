<template>
  <div>
    <h3 class="title">Fav</h3>
    <div v-if="fav.length > 0">
      <div class="list-fav" v-for="astre of fav" :key="astre.id">
        &bullet;
        <nuxt-link
          class="btn"
          :to="{ name: 'detail', params: { astre: astre } }"
        >
          {{ astre.name }}
          <planet-icon v-if="astre.isPlanet" />
        </nuxt-link>
        <button class="btn" @click="removeFav(astre)">Remove</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      fav: [],
    };
  },

  async created() {
    this.fav = this.$store.getters["getFavourites"];
  },

  methods: {
    removeFav(astre) {
      this.$store.commit("remove", astre);
      this.$toast.error("Remove from Favories").goAway(1000);
    },
  },
};
</script>

<style scoped>
.btn {
  position: relative;
  border: 1px solid #000;
  color: #000;
  font-size: 1.6em;
  font-weight: normal;
  text-align: center;
  padding: 1em 2em;
  margin: 1em;
}

.btn:hover {
  background-color: #000;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  text-align: center;
  letter-spacing: 1px;
}

.list-fav {
  width: 50%;
  margin: 2em auto;
  display: table;
}
</style>