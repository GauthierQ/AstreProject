<template>
  <div class="container">
    <backButton class="back" />
    <h2 class="title">{{ $route.params.astre.name }}</h2>
    <div v-if="$route.params.astre.isPlanet">Planète</div>
    <div
      class="fav-button-actif"
      v-if="this.fav.includes($route.params.astre)"
      @click="addToFav($route.params.astre)"
    />
    <div
      class="fav-button"
      v-if="!this.fav.includes($route.params.astre)"
      @click="addToFav($route.params.astre)"
    />
    <div class="body">
      <div class="list-of-moon">
        <h3 class="subtitle">Lunes alentours</h3>
        <div v-if="$route.params.astre.moons != null">
          <div v-for="moon of moons" :key="moon.id">
            <div @click="newParams(moon)">
              <div class="btn">
                {{ moon.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-of-planet">
        <h3 class="subtitle">Planète la plus proche</h3>
        <div v-if="$route.params.astre.aroundPlanet != null">
          <div @click="newParams(planet)">
            <div class="btn">
              {{ planet.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import backButton from "../components/backButton.vue";

export default {
  components: { backButton },
  data() {
    return {
      moons: [],
      planet: {},
      fav: [],
    };
  },

  async created() {
    this.getAstre();
  },

  computed: {
    getFav() {
      this.fav = this.$store.getters["getFavourites"];
    },
  },

  methods: {
    addToFav(astre) {
      this.fav = this.$store.getters["getFavourites"];
      if (this.fav.includes(astre)) {
        this.$store.commit("remove", astre);
      } else {
        this.$store.commit("add", astre);
      }
      console.log(this.fav);
      this.$forceUpdate();
    },

    newParams(param) {
      this.$route.params.astre = param;
      console.log("parm : " + param.name);
      console.log("this.route.params" + this.$route.params.astre.name);
      this.getAstre();
      this.$forceUpdate();
    },

    async getAstre() {
      this.moons = [];
      this.planet = {};
      if (this.$route.params.astre.moons != null) {
        var lesMoons = JSON.parse(
          JSON.stringify(this.$route.params.astre.moons)
        );
        console.log(lesMoons);
        lesMoons.forEach((astre) => {
          this.getMoons(astre["rel"]);
        });
      }

      if (this.$route.params.astre.aroundPlanet != null) {
        try {
          const response = await axios.get(
            this.$route.params.astre.aroundPlanet.rel
          );
          this.planet = response.data;
        } catch (e) {
          this.errors.push(e);
        }
      }
    },

    async getMoons(url) {
      try {
        console.log("url : " + url);
        var response = await axios.get(url);
        this.moons.push(response.data);
      } catch (e) {
        this.errors.push(e);
      }
    },
  },
};
</script>


<style scoped>
.container {
  display: table !important;
  max-width: 1200px;
}

.back {
  left: 10%;
  top: 5%;
  position: absolute;
}

.list-of-moon {
  text-align: left;
  padding: 3em 10em;
}

.btn {
  border: 1px solid #000;
  color: #000;
  font-size: 1.6em;
  font-weight: normal;
  text-align: center;
}
.btn:hover {
  background-color: #000;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s;
}

.list-of-planet {
  text-align: left;
  padding: 5em 10em;
}

.body {
  display: inline-flex;
}

.container {
  margin: 5% auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 32px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

ul li {
  content: "\2022";
  font-family: FontAwesome;
  margin-right: 10px;
  border: 1px solid #000;
  margin: 10px;
  color: #000;
  vertical-align: middle;
  font-size: 1.6em;
  font-weight: normal;
}

ul li:hover {
  background-color: #000;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s;
}

input {
  padding: 1em;
  margin: 1em;
  min-width: calc(15% + 2em);
  border: 1px solid grey;
}

.fav-button {
  color: #f00;
  display: flex;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  border: 2px solid #f00;
  background-color: transparent;
}

.fav-button-activ {
  color: #f00;
  display: flex;
  border-radius: 100%;
  min-width: 25px;
  min-height: 25px;
  padding: 10px;
  margin: 0 auto;
  border: 2px solid #f00;
  background-color: #f00;
}

.fav-button-activ:hover {
  cursor: pointer;
  background-color: transparent;
  transition: all 0.3s;
}

.fav-button:hover {
  cursor: pointer;
  background-color: #f00;
  transition: all 0.3s;
}
</style>
