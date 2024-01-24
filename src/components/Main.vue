<template>
  <div class="text-light">
    <h1>POKE MEMORIES</h1>
    <h2>Select mode to start game</h2>
    <div class="game-mode-container">
      <div v-for="mode of gameModes">
        <SelectGameModeButton :game-mode="mode" @on-select-mode="onStartGame" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectGameModeButton from "./SelectGameModeButton.vue";
import { TGameMode } from "./utils";

const gameModes: TGameMode[] = [
  {
    id: "1",
    title: "4x4",
    description: "easy level",
    totalCards: 16,
  },
  {
    id: "2",
    title: "6x6",
    description: "medium level",
    totalCards: 36,
  },
  {
    id: "3",
    title: "8x8",
    description: "hard level",
    totalCards: 64,
  },
  {
    id: "4",
    title: "10x10",
    description: "master level",
    totalCards: 100,
  },
];

const emit = defineEmits(["on-start-game"]);

const onStartGame = (gameMode: TGameMode) => {
  emit("on-start-game", gameMode);
};
</script>

<style scoped>
h1,
h2 {
  margin: 0 auto 1rem auto;
  line-height: 1;
}

.game-mode-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
