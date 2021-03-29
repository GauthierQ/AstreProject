<template>
  <span class="back-button">
   <button @click="backButton">Back</button>
  </span>
</template>

<script>
export default {

  methods: {
    backButton() {
        return this.$router.go(-1);
    }
  },
};
</script>

<style>
.back-button{
    color: #000;
    display: flex;
}

.back-button:hover{
    cursor: pointer;
}
</style>