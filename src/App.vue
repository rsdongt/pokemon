<script setup lang="ts">
import Main from "./components/Main.vue";
import Interact from "./components/Interact.vue";
import Result from "./components/Result.vue";
import { ref } from "vue";
import { EPageStatus, TGameMode, TGlobalState } from "./components/utils";

const state = ref<TGlobalState>({ pageStatus: EPageStatus.MAIN });

const onStartGame = (gameMode: TGameMode) => {
  state.value = {
    pageStatus: EPageStatus.INTERACT,
    gameMode
  }
}

const onGameComplete = (timmer: string) => {
  state.value = {
    pageStatus: EPageStatus.RESULT,
    timmer
  }
}

const onPlayAgain = () => {
  state.value = {
    pageStatus: EPageStatus.MAIN
  }
}
</script>

<template>
  <div v-if="state.pageStatus === EPageStatus.MAIN">
    <Main @on-start-game="onStartGame" />
  </div>

  <div v-else-if="state.pageStatus === EPageStatus.INTERACT">
    <Interact :game-mode="state.gameMode" @on-game-complete="onGameComplete" />
  </div>

  <div v-else-if="state.pageStatus === EPageStatus.RESULT">
    <Result @on-play-again="onPlayAgain" :timmer="state.timmer" />
  </div>
</template>
