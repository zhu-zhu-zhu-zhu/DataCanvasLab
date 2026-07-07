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
      <div class="screen-header__crown">
        <span class="screen-header__gem" />
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
  padding: 0 28px;
  position: relative;
  background:
    linear-gradient(180deg, rgba(0, 229, 255, 0.1) 0%, rgba(0, 229, 255, 0.02) 60%, transparent 100%),
    linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.06) 50%, transparent);
  border-bottom: 1px solid rgba(0, 229, 255, 0.15);

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 5%,
      rgba(0, 229, 255, 0.2) 20%,
      rgba(0, 229, 255, 0.8) 50%,
      rgba(0, 229, 255, 0.2) 80%,
      transparent 95%
    );
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
  }

  &__wing {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    color: $color-text-dim;

    &--right {
      justify-content: flex-end;
    }
  }

  &__deco {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, transparent, $color-primary);
    opacity: 0.6;

    &--mirror {
      background: linear-gradient(90deg, $color-primary, transparent);
    }
  }

  &__tag {
    padding: 5px 12px;
    border: 1px solid rgba(0, 229, 255, 0.35);
    background: rgba(0, 229, 255, 0.06);
    color: $color-primary;
    font-family: $font-display;
    font-size: 10px;
    letter-spacing: 0.18em;
    clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
  }

  &__chip {
    padding: 3px 8px;
    font-family: $font-display;
    font-size: 9px;
    letter-spacing: 0.12em;
    color: $color-success;
    border: 1px solid rgba(45, 212, 191, 0.35);
    background: rgba(45, 212, 191, 0.08);
  }

  &__weather {
    font-size: 12px;
    letter-spacing: 0.06em;
  }

  &__center {
    text-align: center;
    position: relative;
    padding: 0 40px;
  }

  &__crown {
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, transparent, $color-accent, transparent);
    opacity: 0.7;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 40px;
      height: 1px;
      background: $color-primary;
      opacity: 0.5;
    }

    &::before {
      left: -50px;
      transform: rotate(-12deg);
    }

    &::after {
      right: -50px;
      transform: rotate(12deg);
    }
  }

  &__gem {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: $color-accent;
    box-shadow: 0 0 12px $color-accent;
  }

  &__title {
    font-family: $font-display;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: 0.28em;
    margin-left: 0.28em;
    position: relative;
  }

  &__title-inner {
    background: linear-gradient(180deg, #fff 0%, $color-primary 45%, $color-secondary 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.45));
  }

  &__subtitle {
    margin-top: 6px;
    font-size: 11px;
    letter-spacing: 0.32em;
    color: $color-text-dim;
    text-transform: uppercase;
  }

  &__underline {
    width: 200px;
    height: 2px;
    margin: 8px auto 0;
    background: linear-gradient(90deg, transparent, $color-primary, transparent);
    opacity: 0.5;
  }

  &__clock {
    font-family: $font-display;
    font-size: 15px;
    letter-spacing: 0.08em;
    padding: 6px 12px;
    border: 1px solid rgba(255, 193, 77, 0.3);
    background: rgba(255, 193, 77, 0.06);
    @include glow-text($color-accent);
  }
}
</style>
