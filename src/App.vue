<template>
  <audio
    v-for="tile in tiles"
    :key="tile.id"
    :src="`https://s3.amazonaws.com/freecodecamp/simonSound${tile.id + 1}.mp3`"
    :ref="`tone-${tile.id}`"
  ></audio>
  <div class="app-container">
    <Header />
    <div class="ui-container">
      {{ this.message }}
      <Form @start-game="invokeNextRound" />
    </div>
    <div class="field-container">
      <Tile
        v-for="tile in tiles"
        :ref="`tile-${tile.id}`"
        :id="`tile-${tile.id}`"
        :key="tile.id"
        :color="tile.color"
        @click="handleTileClick(tile.id)"
      />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Tile from "./components/Tile.vue";
import Form from "./components/Form";
import engine from "./js/engine.js";

export default {
  name: "App",
  components: {
    Header,
    Tile,
    Form,
  },
  mixins: [engine],
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ui-container {
  position: relative;
  height: 50px;
  margin-top: 20px;
}
.field-container {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
}
</style>
