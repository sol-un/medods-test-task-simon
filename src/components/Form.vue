<template>
  <div class="list-container" v-if="show">
    <label for="level">Level: </label>
    <select id="level" v-model="selected">
      <option v-for="level in levels" :key="level" :value="level">
        {{ level }}
      </option>
    </select>
  </div>
  <button
    v-if="show"
    @click="
      $emit('start-game', selected);
      hideUi();
    "
  >
    Start game
  </button>
</template>

<script>
import { settings } from "../js/engine.js";

const levels = Object.keys(settings.levels);
const [, normal] = levels;

export default {
  name: "Form",
  emits: ["start-game"],
  methods: {
    hideUi() {
      this.show = false;
    },
  },
  data() {
    return {
      show: true,
      selected: normal,
      levels,
    };
  },
};
</script>

<style scoped>
.list-container {
  position: absolute;
  left: -54px;
  top: -25px;
  box-sizing: border-box;
  width: max-content;
}

button {
  position: absolute;
  left: -40px;
  top: -5px;
  box-sizing: border-box;
  width: max-content;
  margin-top: 10px;
}
</style>
