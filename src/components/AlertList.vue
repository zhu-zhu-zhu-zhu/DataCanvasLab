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
    grid-template-columns: 3px 58px 48px 1fr;
    gap: 8px;
    align-items: center;
    padding: 9px 10px;
    margin-bottom: 4px;
    font-size: 11px;
    background: rgba(167, 139, 250, 0.03);
    border: 1px solid rgba(212, 175, 122, 0.06);
    border-radius: $radius-sm;
    transition: background 0.2s;

    &:hover {
      background: rgba(212, 175, 122, 0.05);
    }

    &.info .alert-list__indicator {
      background: $color-secondary;
      box-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
    }

    &.info .alert-list__level {
      color: $color-secondary;
    }

    &.warn .alert-list__indicator {
      background: $color-primary;
      box-shadow: 0 0 8px rgba(212, 175, 122, 0.4);
    }

    &.warn .alert-list__level {
      color: $color-primary;
    }

    &.error .alert-list__indicator {
      background: $color-danger;
      box-shadow: 0 0 8px rgba(251, 113, 133, 0.4);
    }

    &.error .alert-list__level {
      color: $color-danger;
    }
  }

  &__indicator {
    width: 3px;
    height: 100%;
    min-height: 20px;
    border-radius: 2px;
  }

  &__time {
    color: $color-text-dim;
    font-family: $font-mono;
    font-size: 10px;
  }

  &__level {
    font-weight: 600;
    font-size: 9px;
    letter-spacing: 0.08em;
  }

  &__msg {
    color: rgba(245, 240, 235, 0.88);
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
