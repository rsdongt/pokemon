<template>
  <div class="timmer-box">{{ formatTimer(timmer) }}</div>
  <div
    class="card-container"
    :style="{
      gridTemplateColumns: `repeat(${Math.sqrt(
        props.gameMode?.totalCards ?? 0
      )}, 1fr)`,
    }"
  >
    <div v-for="card of cardList">
      <GameCard :cardDetail="card" @on-click="onCompare" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GameCard from "./GameCard.vue";
import { TGameMode, TCardDetail, ECardStatus } from "./utils";

type TProps = {
  gameMode?: TGameMode;
};

const emit = defineEmits(["on-game-complete"]);

const props = defineProps<TProps>();

const initCards = (totalCards: number): TCardDetail[] => {
  const cards: TCardDetail[] = [];

  for (let i = 1; i <= totalCards / 2; i++) {
    cards.push({
      url: `/assets/${i + 1}.png`,
      status: ECardStatus.PENDING,
    });
  }

  return [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map((_, index) => ({ ..._, index }));
};

const { totalCards = 0 } = props.gameMode ?? {};

const cardList = ref<TCardDetail[]>(initCards(totalCards));

const compareList = ref<TCardDetail[]>([]);

// #region -- timmer
const timmer = ref(0);

const intervalId = setInterval(() => {
  timmer.value += 1;
}, 1000);

const formatTimer = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
// #endregion -- timmer
const checkAllCardMatched = () => {
  let result = true;

  for (let card of cardList.value) {
    if (card.status !== ECardStatus.MATCHED) {
      result = false;

      break;
    }
  }

  return result;
};

// #region -- interact with card logic
const updateCardStatus = (card: TCardDetail, status: ECardStatus) => {
  cardList.value = cardList.value.map((data: TCardDetail) => {
    if (card.url === data.url && card.index === data.index) {
      return { ...data, status: status };
    } else {
      return { ...data };
    }
  });
};

const compareCard = (card1: TCardDetail, card2: TCardDetail) => {
  if (card1.url === card2.url) {
    updateCardStatus(card1, ECardStatus.MATCHED);
    updateCardStatus(card2, ECardStatus.MATCHED);
  } else {
    updateCardStatus(card1, ECardStatus.PENDING);
    updateCardStatus(card2, ECardStatus.PENDING);
  }
};

const onCompare = (card: TCardDetail) => {
  if (compareList.value.length < 2) {
    // register to compare list
    compareList.value = [...compareList.value, card];

    // update status of selected card
    updateCardStatus(card, ECardStatus.COMPARING);
  }

  if (compareList.value.length === 2) {
    setTimeout(() => {
      // compare two card by url and update card status
      compareCard(compareList.value[0], compareList.value[1]);

      // update clear compare list
      compareList.value = [];

      // check is all card matched => change page status to congratulations page
      if (checkAllCardMatched()) {
        emit("on-game-complete", formatTimer(timmer.value));

        clearInterval(intervalId);
      }
    }, 800);
  }
};
// #endregion -- interact with card logic
</script>

<style scoped>
.card-container {
  display: grid;
  gap: 1rem;
}

.timmer-box {
  border: 1px solid #f1f1f1;
  background: #fff;
  width: 150px;
  margin: 0 auto 1rem auto;
}
</style>
