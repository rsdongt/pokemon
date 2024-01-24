<template>
    <button @click="onSelectMode" class="center-box">
        <span>{{ props.gameMode.title }}</span>
        <span>{{ props.gameMode.description }}</span>
    </button>
</template>

<script setup lang="ts">
    import { TGameMode } from './utils';

    const props = defineProps<{gameMode: TGameMode}>();

    const emit = defineEmits(['on-select-mode']);

    const onSelectMode = () => {
        emit('on-select-mode', props.gameMode)
    }
</script>

<style scoped>
    button {
        flex-direction: column;
        width: 150px;
        height: 150px;
        border-radius: 1rem;
    }

    button:hover {
        background: #94b5d3;
        transition: .25s ease-in-out;
    }
</style>