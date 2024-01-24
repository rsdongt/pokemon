<template>
  <div>
    <h1 class="text-light">✨ Congratulations ✨</h1>
    <h2>🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓</h2>
    <h2 class="text-light">You have completed game at {{ props.timmer }}</h2>
    <button @click="onPlayAgain">start again</button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

const props = defineProps<{timmer?: string}>();

const emit = defineEmits(["on-play-again"]);

const onPlayAgain = () => {
  emit("on-play-again");
};
</script>
