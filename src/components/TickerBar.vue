<script setup lang="ts">
import { tickerMessages } from '@/mock/data/dashboard.data'
</script>

<template>
  <div class="ticker">
    <div class="ticker__track">
      <span v-for="(msg, i) in tickerMessages" :key="i" class="ticker__item">{{ msg }}</span>
      <span v-for="(msg, i) in tickerMessages" :key="`dup-${i}`" class="ticker__item">{{ msg }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  overflow: hidden;
  white-space: nowrap;
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);

  &__track {
    display: inline-flex;
    gap: 48px;
    animation: ticker 30s linear infinite;
  }

  &__item {
    font-size: 13px;
    color: $color-text-dim;
    letter-spacing: 0.06em;

    &::before {
      content: '◆';
      color: $color-primary;
      margin-right: 10px;
      font-size: 10px;
    }
  }
}

@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
