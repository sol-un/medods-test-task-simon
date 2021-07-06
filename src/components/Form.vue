<template>
  <div class="list-container" v-if="!hidden">
    <label for="difficulty">Difficulty: </label>
    <select id="difficulty" v-model="selected">
      <option
        v-for="difficulty in difficulties"
        :key="difficulty"
        :value="difficulty"
        :selected="difficulty === selected"
      >
        {{ difficulty }}
      </option>
    </select>
  </div>
  <button
    v-if="!hidden"
    @click="
      $emit('start-game', selected);
      hideUi();
    "
  >
    Start game
  </button>
</template>

<script>
export default {
  name: "Form",
  emits: ["start-game"],
  methods: {
    hideUi() {
      this.hidden = true;
    },
  },
  data() {
    return {
      hidden: false,
      selected: "normal",
      difficulties: ["easy", "normal", "hard"],
    };
  },
};
</script>

<style scoped>
.list-container {
  position: absolute;
  left: -67px;
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
