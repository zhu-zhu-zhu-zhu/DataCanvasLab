<script setup lang="ts">
import { ref } from 'vue'
import { useScreenScale } from '@/composables/useScreenScale'

const containerRef = ref<HTMLElement | null>(null)
const { scale, designWidth, designHeight } = useScreenScale(containerRef)
</script>

<template>
  <div class="screen-layout">
    <div ref="containerRef" class="screen-layout__viewport">
      <div
        class="screen-layout__canvas"
        :style="{
          width: `${designWidth}px`,
          height: `${designHeight}px`,
          transform: `scale(${scale})`,
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.screen-layout {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__viewport {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__canvas {
    transform-origin: center center;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
}
</style>
