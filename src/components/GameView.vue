<script setup lang="ts">
import { onMounted, ref } from 'vue';
import init from '../game/init';
import { globalState } from '../game/state';

const view = ref<HTMLCanvasElement>();

onMounted(() => {
  const ctx = view.value!.getContext('2d')!;
  globalState.canvas = view.value!;
  view.value!.width = window.innerWidth;
  view.value!.height = window.innerHeight;
  init(ctx);
});
</script>

<template>
  <canvas ref="view" />
</template>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
