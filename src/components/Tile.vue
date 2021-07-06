<template>
  <div v-bind:style="{ 'background-color': color, opacity }"></div>
</template>

<script>
export default {
  name: "Tile",
  props: {
    color: String,
  },
  data() {
    return {
      opacity: 1,
    };
  },
};
</script>

<style scoped>
div {
  width: 240px;
  height: 240px;
  border: 5px solid black;
}
</style>
