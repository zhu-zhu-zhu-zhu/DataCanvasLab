<script setup lang="ts">
import type { RankItem } from '@/api/adapters/types'
import { formatNumber } from '@/utils/format'

defineProps<{
  items: RankItem[]
}>()
</script>

<template>
  <ul class="rank-list">
    <li v-for="item in items" :key="item.rank" class="rank-list__item">
      <span class="rank-list__badge" :class="`rank-${item.rank}`">{{ item.rank }}</span>
      <span class="rank-list__name">{{ item.name }}</span>
      <span class="rank-list__value">{{ formatNumber(item.value) }} {{ item.unit }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.rank-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__item {
    display: grid;
    grid-template-columns: 32px 1fr auto;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 6px;
    background: rgba(0, 212, 255, 0.04);
    border: 1px solid rgba(0, 212, 255, 0.08);
  }

  &__badge {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-family: $font-display;
    font-size: 12px;
    background: rgba(59, 130, 246, 0.25);
    color: $color-text;

    &.rank-1 {
      background: rgba(251, 191, 36, 0.35);
      color: $color-accent;
    }

    &.rank-2,
    &.rank-3 {
      background: rgba(0, 212, 255, 0.2);
    }
  }

  &__name {
    font-size: 14px;
  }

  &__value {
    font-family: $font-display;
    font-size: 13px;
    color: $color-primary;
  }
}
</style>
