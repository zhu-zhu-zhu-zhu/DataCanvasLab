<script setup lang="ts">
import { tickerMessages } from '@/mock/data/dashboard.data'
</script>

<template>
  <div class="ticker">
    <span class="ticker__label">LIVE FEED</span>
    <div class="ticker__viewport">
      <div class="ticker__track">
        <span v-for="(msg, i) in tickerMessages" :key="i" class="ticker__item">{{ msg }}</span>
        <span v-for="(msg, i) in tickerMessages" :key="`dup-${i}`" class="ticker__item">{{ msg }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: hidden;

  &__label {
    flex-shrink: 0;
    font-family: $font-display;
    font-size: 9px;
    letter-spacing: 0.2em;
    color: $color-accent;
    padding: 4px 8px;
    border: 1px solid rgba(255, 193, 77, 0.35);
    background: rgba(255, 193, 77, 0.08);
  }

  &__viewport {
    flex: 1;
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }

  &__track {
    display: inline-flex;
    gap: 56px;
    animation: ticker 35s linear infinite;
  }

  &__item {
    font-size: 12px;
    color: $color-text-dim;
    letter-spacing: 0.08em;
    white-space: nowrap;

    &::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      margin-right: 10px;
      background: $color-primary;
      box-shadow: 0 0 6px $color-primary;
      transform: rotate(45deg);
      vertical-align: middle;
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
