<template>
  <div :class="`flip-box ${props.cardDetail.status === ECardStatus.MATCHED && 'matched'}`" @click="onClick">
    <div
      :class="`flip-box-inner ${
        props.cardDetail.status !== ECardStatus.PENDING && 'rotate'
      }`"
    >
      <div class="flip-box-front center-box">
        <img src="/assets/icon_back.png" alt="default background" />
      </div>

      <div class="flip-box-back center-box">
        <img :src="props.cardDetail.url" :alt="props.cardDetail.url" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ECardStatus, TCardDetail } from "./utils";

type TProps = {
  cardDetail: TCardDetail;
};

const props = defineProps<TProps>();

const emit = defineEmits(["on-click"]);

const onClick = () => {
    if (props.cardDetail.status !== ECardStatus.PENDING) {
        return;
    }

    emit('on-click', props.cardDetail)
}
</script>

<style scoped>
.flip-box {
  width: 150px;
  height: 175px;
  cursor: pointer;
  background-color: transparent;
  perspective: 1000px;
}

img {
  width: 75px;
  user-select: none;
}

.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-box-front,
.flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 1rem;
}

.flip-box-front:hover,
.flip-box-back:hover {
  box-shadow: 0 6px 25px 6px rgba(248, 243, 243, 0.2);
  transition: 0.25s ease-in-out;
}

/* Style the front side (fallback if image is missing) */
.flip-box-front {
  background-color: #bbb;
}

/* Style the back side */
.flip-box-back {
  background-color: #00498b;
  transform: rotateY(180deg);
}

.rotate {
  transform: rotateY(180deg);
}

.matched {
  box-shadow: 0 6px 25px 6px rgba(248, 243, 243, 0.2);
  border-radius: 1rem;
}
</style>
