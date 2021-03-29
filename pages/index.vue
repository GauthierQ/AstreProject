<template>
  <div class="container">
    <input
      type="text"
      placeholder="Astre"
      @input="filterData($event.target.value)"
    />
    <div class="filter-section">
      <h3>Filter by planet type</h3>
      <div class="inline">
        <input
          type="radio"
          @input="filterRadio($event.target.value, haveMoon)"
          v-model="isPlanet"
          value="0"
        />All
        <input
          type="radio"
          @input="filterRadio($event.target.value, haveMoon)"
          v-model="isPlanet"
          value="1"
        />Planets
        <input
          type="radio"
          @input="filterRadio($event.target.value, haveMoon)"
          v-model="isPlanet"
          value="2"
        />ø Planets
      </div>
    </div>

    <div class="filter-section">
      <h3>Filtrer by having moons</h3>
      <div class="inline">
        <input
          type="radio"
          @input="filterRadio(isPlanet, $event.target.value)"
          v-model="haveMoon"
          value="0"
        />All
        <input
          type="radio"
          @input="filterRadio(isPlanet, $event.target.value)"
          v-model="haveMoon"
          value="1"
        />Have moons
        <input
          type="radio"
          @input="filterRadio(isPlanet, $event.target.value)"
          v-model="haveMoon"
          value="2"
        />Don't have moons
      </div>
    </div>

    <br />
    <div v-for="astre of dataAstres" :key="astre.id">
      <nuxt-link :to="{name:'detail', params:{astre:astre}}">
        <div class="btn">
          {{ astre.name }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      astres: [],
      dataAstres: [],
      errors: [],
      isPlanet: 0,
      haveMoon: 0,
      filterName: [],
    };
  },

  async created() {
    try {
      const response = await axios.get(
        `https://api.le-systeme-solaire.net/rest/bodies/`
      );
      this.astres = response.data.bodies;
      this.dataAstres = response.data.bodies;
      this.filterName = response.data.bodies;
    } catch (e) {
      this.errors.push(e);
    }
  },

  methods: {
    filterRadio(planet, moon) {
      this.haveMoon = moon;

      this.isPlanet = planet;

      console.log("having moon : " + this.haveMoon);
      console.log("is Planet : " + this.isPlanet);
      var astresList = this.filterName;

      if (this.haveMoon == 0 && this.isPlanet == 0) {
        this.dataAstres = astresList;
      } else if (this.haveMoon == 0 && this.isPlanet == 1) {
        this.dataAstres = astresList.filter((item) => item.isPlanet == true);
      } else if (this.haveMoon == 0 && this.isPlanet == 2) {
        this.dataAstres = astresList.filter((item) => item.isPlanet == false);
      } else if (this.haveMoon == 1 && this.isPlanet == 0) {
        this.dataAstres = astresList.filter((item) => item.moons != null);
      } else if (this.haveMoon == 1 && this.isPlanet == 1) {
        this.dataAstres = astresList.filter(
          (item) => item.moons != null && item.isPlanet == true
        );
      } else if (this.haveMoon == 1 && this.isPlanet == 2) {
        this.dataAstres = astresList.filter(
          (item) => item.moons != null && item.isPlanet == false
        );
      } else if (this.haveMoon == 2 && this.isPlanet == 0) {
        this.dataAstres = astresList.filter((item) => item.moons == null);
      } else if (this.haveMoon == 2 && this.isPlanet == 1) {
        this.dataAstres = astresList.filter(
          (item) => item.moons == null && item.isPlanet == true
        );
      } else {
        this.dataAstres = astresList.filter(
          (item) => item.moons == null && item.isPlanet == false
        );
      }

      console.log(this.dataAstres.length);
    },

    filterData(event) {
      if (event != null) {
        this.dataAstres = this.astres.filter((item) =>
          item.name.toLowerCase().includes(event.toLowerCase())
        );
        this.filterName = this.astres.filter((item) =>
          item.name.toLowerCase().includes(event.toLowerCase())
        );
      }
    },
  },
};
</script> 


<style>
.filter-section {
  padding: 1em 0;
}

.container {
  display: table !important;
  max-width: 1200px;
}

.title {
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.btn {
  padding: 1em;
  margin: 1em;
  border: 1px solid #000;
  color: #000;
  font-size: 1.6em;
  font-weight: normal;
  text-align: center;
  line-height: 5em;
  min-width: calc(15% + 2em);
}

.btn:hover {
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
.inline {
  display: inline;
  width: 100%;
}
</style>
