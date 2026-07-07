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
    <div class="screen-header__wing screen-header__wing--left">
      <span class="screen-header__deco" />
      <span class="screen-header__tag">SMART CITY</span>
      <span class="screen-header__chip">NODE-07</span>
      <span class="screen-header__weather">上海 · 26°C · 优</span>
    </div>

    <div class="screen-header__center">
      <div class="screen-header__ornament">
        <span class="screen-header__gem" />
        <span class="screen-header__ornament-line" />
      </div>
      <h1 class="screen-header__title">
        <span class="screen-header__title-inner">数绘视界</span>
      </h1>
      <p class="screen-header__subtitle">DataCanvasLab · 智慧城市运营监控中心</p>
      <div class="screen-header__underline" />
    </div>

    <div class="screen-header__wing screen-header__wing--right">
      <span class="screen-header__chip">SYS OK</span>
      <span class="screen-header__clock">{{ timeText() }}</span>
      <span class="screen-header__deco screen-header__deco--mirror" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.screen-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 96px;
  padding: 0 32px;
  position: relative;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(184, 155, 248, 0.08) 30%, transparent 75%),
    linear-gradient(90deg, transparent, rgba(232, 200, 150, 0.06) 50%, transparent);
  border-bottom: 1px solid rgba(232, 200, 150, 0.16);
  box-shadow: 0 4px 24px rgba(184, 155, 248, 0.08);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 8%,
      rgba(167, 139, 250, 0.25) 25%,
      rgba(212, 175, 122, 0.7) 50%,
      rgba(167, 139, 250, 0.25) 75%,
      transparent 92%
    );
    box-shadow: 0 0 24px rgba(212, 175, 122, 0.25);
  }

  &__wing {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 12px;
    color: $color-text-dim;

    &--right {
      justify-content: flex-end;
    }
  }

  &__deco {
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, transparent, $color-primary);
    opacity: 0.5;

    &--mirror {
      background: linear-gradient(90deg, $color-primary, transparent);
    }
  }

  &__tag {
    padding: 5px 14px;
    border: 1px solid rgba(212, 175, 122, 0.25);
    background: rgba(212, 175, 122, 0.05);
    color: $color-primary;
    font-family: $font-body;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.2em;
    border-radius: $radius-sm;
  }

  &__chip {
    padding: 4px 10px;
    font-family: $font-body;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: $color-success;
    border: 1px solid rgba(134, 239, 172, 0.25);
    background: rgba(134, 239, 172, 0.06);
    border-radius: $radius-sm;
  }

  &__weather {
    font-size: 12px;
    letter-spacing: 0.04em;
  }

  &__center {
    text-align: center;
    position: relative;
    padding: 0 48px;
  }

  &__ornament {
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__ornament-line {
    width: 100px;
    height: 1px;
    margin-top: 6px;
    background: linear-gradient(90deg, transparent, $color-secondary, $color-primary, $color-secondary, transparent);
    opacity: 0.6;
  }

  &__gem {
    width: 6px;
    height: 6px;
    transform: rotate(45deg);
    background: linear-gradient(135deg, $color-primary, $color-accent);
    box-shadow: 0 0 14px rgba(212, 175, 122, 0.5);
  }

  &__title {
    font-family: $font-display;
    font-size: 40px;
    font-weight: 600;
    letter-spacing: 0.22em;
    margin-left: 0.22em;
    position: relative;
    line-height: 1.1;
  }

  &__title-inner {
    background: linear-gradient(
      180deg,
      #fff 0%,
      $color-primary 35%,
      $color-secondary 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 12px rgba(212, 175, 122, 0.3));
  }

  &__subtitle {
    margin-top: 8px;
    font-size: 10px;
    letter-spacing: 0.28em;
    color: $color-text-dim;
    text-transform: uppercase;
    font-weight: 500;
  }

  &__underline {
    width: 160px;
    height: 1px;
    margin: 10px auto 0;
    background: linear-gradient(90deg, transparent, $color-primary, transparent);
    opacity: 0.45;
  }

  &__clock {
    font-family: $font-mono;
    font-size: 13px;
    letter-spacing: 0.06em;
    padding: 7px 14px;
    border: 1px solid rgba(212, 175, 122, 0.22);
    background: rgba(212, 175, 122, 0.05);
    color: $color-primary;
    border-radius: $radius-sm;
  }
}
</style>
