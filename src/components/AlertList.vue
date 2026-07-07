<script setup lang="ts">
import type { AlertItem } from '@/api/adapters/types'

defineProps<{
  items: AlertItem[]
}>()
</script>

<template>
  <div class="alert-list">
    <ul class="alert-list__track">
      <li v-for="item in items" :key="item.id" class="alert-list__item" :class="item.level">
        <span class="alert-list__indicator" />
        <span class="alert-list__time">{{ item.time }}</span>
        <span class="alert-list__level">{{ item.level.toUpperCase() }}</span>
        <span class="alert-list__msg">{{ item.message }}</span>
      </li>
      <li v-for="item in items" :key="`${item.id}-dup`" class="alert-list__item" :class="item.level">
        <span class="alert-list__indicator" />
        <span class="alert-list__time">{{ item.time }}</span>
        <span class="alert-list__level">{{ item.level.toUpperCase() }}</span>
        <span class="alert-list__msg">{{ item.message }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.alert-list {
  height: 100%;
  overflow: hidden;
  mask-image: linear-gradient(180deg, transparent, #000 6%, #000 94%, transparent);

  &__track {
    list-style: none;
    animation: scroll 28s linear infinite;
  }

  &__item {
    display: grid;
    grid-template-columns: 4px 58px 48px 1fr;
    gap: 8px;
    align-items: center;
    padding: 9px 8px;
    margin-bottom: 4px;
    font-size: 11px;
    background: rgba(0, 229, 255, 0.02);
    border: 1px solid rgba(0, 229, 255, 0.06);
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 229, 255, 0.06);
    }

    &.info .alert-list__indicator {
      background: $color-primary;
      box-shadow: 0 0 8px $color-primary;
    }

    &.info .alert-list__level {
      color: $color-primary;
    }

    &.warn .alert-list__indicator {
      background: $color-accent;
      box-shadow: 0 0 8px $color-accent;
    }

    &.warn .alert-list__level {
      color: $color-accent;
    }

    &.error .alert-list__indicator {
      background: $color-danger;
      box-shadow: 0 0 8px $color-danger;
    }

    &.error .alert-list__level {
      color: $color-danger;
    }
  }

  &__indicator {
    width: 4px;
    height: 100%;
    min-height: 20px;
    border-radius: 2px;
  }

  &__time {
    color: $color-text-dim;
    font-family: $font-display;
    font-size: 10px;
  }

  &__level {
    font-weight: 700;
    font-size: 9px;
    letter-spacing: 0.08em;
  }

  &__msg {
    color: rgba(238, 246, 255, 0.9);
    line-height: 1.3;
  }
}

@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>
