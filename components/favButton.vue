<template>
  <span class="fav-button">
   <button @click="addToFav(astre)"></button>
  </span>
</template>

<script>
export default {

  props:{
      astre: {}
    },

  methods: {
    addToFav(astre) {
        if(this.$store.state.AppData.favorites.includes(astre)){
            this.$store.commit("remove", astre);
        }else{
            this.$store.commit("add", astre);
        }

    }
  },
};
</script>

<style scoped>
.fav-button{
    color: #F00;
    display: flex;
    border-radius: 100%;
    width: 25px;
    height: 25px;
    margin: 0 auto;
    border: 2px solid #f00;
    background-color: transparent;
}


.fav-button:hover{
    cursor: pointer;
    background-color: #f00;
    transition: all 0.3s;
}
</style>