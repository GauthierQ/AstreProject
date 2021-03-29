<template>
    <nuxt-link class="fav-button" :to="{name:'favories'}">Fav</nuxt-link>
</template>

<script>
export default {

  methods: {
    
  },
};
</script>

<style scoped>
.fav-button{
    position: absolute;
    right: 10%;
    top: 5%;
    color: #000;
    display: flex;
    border: 2px solid #000;
    padding: 1em 2em;
}

.fav-button:hover{
    cursor: pointer;
    background-color: #000;
    color: #fff;
    transition: all 0.3s;
}
</style>