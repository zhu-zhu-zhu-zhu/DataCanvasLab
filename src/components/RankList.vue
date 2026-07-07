<script setup lang="ts">
import type { RankItem } from '@/api/adapters/types'
import { computed } from 'vue'
import { formatNumber } from '@/utils/format'

const props = defineProps<{
  items: RankItem[]
}>()

const maxValue = computed(() => Math.max(...props.items.map((i) => i.value), 1))
</script>

<template>
  <ul class="rank-list">
    <li v-for="item in items" :key="item.rank" class="rank-list__item">
      <span class="rank-list__badge" :class="`rank-${item.rank}`">{{ item.rank }}</span>
      <div class="rank-list__content">
        <div class="rank-list__row">
          <span class="rank-list__name">{{ item.name }}</span>
          <span class="rank-list__value">{{ formatNumber(item.value) }} {{ item.unit }}</span>
        </div>
        <div class="rank-list__track">
          <div
            class="rank-list__fill"
            :class="`rank-${item.rank}`"
            :style="{ width: `${(item.value / maxValue) * 100}%` }"
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.rank-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 12px;
    background: linear-gradient(90deg, rgba(0, 229, 255, 0.05), transparent);
    border: 1px solid rgba(0, 229, 255, 0.1);
    border-left: 2px solid rgba(0, 229, 255, 0.35);
    transition: border-color 0.2s, background 0.2s;

    &:hover {
      background: linear-gradient(90deg, rgba(0, 229, 255, 0.1), transparent);
      border-left-color: $color-primary;
    }
  }

  &__badge {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-display;
    font-size: 12px;
    font-weight: 700;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: rgba(79, 140, 255, 0.35);
    color: $color-text;
    flex-shrink: 0;

    &.rank-1 {
      background: rgba(255, 193, 77, 0.45);
      color: $color-accent;
      box-shadow: 0 0 12px rgba(255, 193, 77, 0.35);
    }

    &.rank-2 {
      background: rgba(0, 229, 255, 0.3);
    }

    &.rank-3 {
      background: rgba(139, 92, 246, 0.35);
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  &__name {
    font-size: 13px;
    letter-spacing: 0.04em;
  }

  &__value {
    font-family: $font-display;
    font-size: 12px;
    color: $color-primary;
  }

  &__track {
    height: 4px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, $color-secondary, $color-primary);
    transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);

    &.rank-1 {
      background: linear-gradient(90deg, $color-accent, #ff8c42);
    }
  }
}
</style>
