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
        <span class="alert-list__time">{{ item.time }}</span>
        <span class="alert-list__level">{{ item.level.toUpperCase() }}</span>
        <span class="alert-list__msg">{{ item.message }}</span>
      </li>
      <li v-for="item in items" :key="`${item.id}-dup`" class="alert-list__item" :class="item.level">
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
  mask-image: linear-gradient(180deg, transparent, #000 8%, #000 92%, transparent);

  &__track {
    list-style: none;
    animation: scroll 24s linear infinite;
  }

  &__item {
    display: grid;
    grid-template-columns: 64px 52px 1fr;
    gap: 10px;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px dashed rgba(0, 212, 255, 0.1);
    font-size: 12px;

    &.info .alert-list__level {
      color: $color-primary;
    }

    &.warn .alert-list__level {
      color: $color-accent;
    }

    &.error .alert-list__level {
      color: #fb7185;
    }
  }

  &__time {
    color: $color-text-dim;
    font-family: $font-display;
  }

  &__level {
    font-weight: 700;
    font-size: 10px;
  }

  &__msg {
    color: $color-text;
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
