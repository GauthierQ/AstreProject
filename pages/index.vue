<template>
  <div class="container">
    <div class="text-center">
      <input
      type="text"
      placeholder="Astre"
      @input="filterData($event.target.value)"
    />
    </div>
    
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
    <div class="text-center " v-for="astre of dataAstres" :key="astre.id">
      <nuxt-link class="btn-astre" :to="{ name: 'detail', params: { astre: astre } }">
          {{ astre.name }}
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
      const ALL_MOONS = "0";
      const PLANETS_WITH_MOONS = "1";
      const PLANETS_WITH_NO_MOONS = "2";

      const ALL_PLANETS_AND_MOONS = "0";
      const ONLY_PLANETS = "1";
      const ONLY_MOONS = "2";

      switch (this.haveMoon) {
        case ALL_MOONS:
          this.dataAstres = [...astresList];
          break;
        case PLANETS_WITH_MOONS:
          this.dataAstres = [
            ...astresList.filter((item) => item.moons != null),
          ];
          break;
        case PLANETS_WITH_NO_MOONS:
          this.dataAstres = [
            ...astresList.filter((item) => item.moons == null),
          ];
          break;
      }
      switch (this.isPlanet) {
        case ALL_PLANETS_AND_MOONS:
          break;
        case ONLY_PLANETS:
          this.dataAstres = [
            ...this.dataAstres.filter((item) => item.isPlanet),
          ];
          break;
        case ONLY_MOONS:
          this.dataAstres = [
            ...this.dataAstres.filter((item) => !item.isPlanet),
          ];
          break;
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


<style scoped>
.filter-section {
  padding: 1em 2em;
}

.container {
  display: table !important;
  max-width: 1200px;
  margin: 5% 10%;
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

.btn-astre {
  padding: 1em 2em;
  margin: 1em auto !important;
  border: 1px solid #000;
  color: #000;
  font-size: 1.6em;
  font-weight: normal;
  text-align: center;
  line-height: 5em;
  min-width: calc(15% + 2em);
}

.btn-astre:hover {
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
.text-center {
  text-align: center;
}
</style>
