<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const now = ref(new Date())
let timer: number | null = null

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const timeText = () =>
  now.value.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
</script>

<template>
  <header class="screen-header">
    <div class="screen-header__side">
      <span class="screen-header__tag">SMART CITY</span>
      <span class="screen-header__weather">🌤 上海 26°C · 优</span>
    </div>
    <div class="screen-header__center">
      <h1 class="screen-header__title">如意数据大屏</h1>
      <p class="screen-header__subtitle">DataCanvasLab · 智慧城市运营监控中心</p>
    </div>
    <div class="screen-header__side screen-header__side--right">
      <span class="screen-header__clock">{{ timeText() }}</span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.screen-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 88px;
  padding: 0 24px;
  background: linear-gradient(180deg, rgba(0, 212, 255, 0.12), transparent);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, $color-primary, transparent);
    box-shadow: 0 0 16px rgba(0, 212, 255, 0.6);
  }

  &__side {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 13px;
    color: $color-text-dim;

    &--right {
      justify-content: flex-end;
    }
  }

  &__tag {
    padding: 4px 10px;
    border: 1px solid rgba(0, 212, 255, 0.35);
    border-radius: 4px;
    color: $color-primary;
    font-family: $font-display;
    font-size: 11px;
    letter-spacing: 0.15em;
  }

  &__center {
    text-align: center;
  }

  &__title {
    font-family: $font-display;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: 0.2em;
    @include glow-text($color-primary);
  }

  &__subtitle {
    margin-top: 4px;
    font-size: 13px;
    letter-spacing: 0.25em;
    color: $color-text-dim;
  }

  &__clock {
    font-family: $font-display;
    font-size: 16px;
    @include glow-text($color-accent);
  }
}
</style>
