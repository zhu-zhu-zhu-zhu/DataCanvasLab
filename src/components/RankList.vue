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
  gap: 10px;

  &__item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 14px;
    background: linear-gradient(90deg, rgba(167, 139, 250, 0.04), transparent);
    border: 1px solid rgba(212, 175, 122, 0.08);
    border-radius: $radius-sm;
    transition: border-color 0.25s, background 0.25s;

    &:hover {
      background: linear-gradient(90deg, rgba(212, 175, 122, 0.06), transparent);
      border-color: rgba(212, 175, 122, 0.18);
    }
  }

  &__badge {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-display;
    font-size: 13px;
    font-weight: 600;
    border-radius: 50%;
    background: rgba(167, 139, 250, 0.2);
    color: $color-text;
    flex-shrink: 0;

    &.rank-1 {
      background: linear-gradient(135deg, rgba(212, 175, 122, 0.5), rgba(212, 175, 122, 0.25));
      color: $color-primary;
      box-shadow: 0 0 12px rgba(212, 175, 122, 0.3);
    }

    &.rank-2 {
      background: rgba(167, 139, 250, 0.25);
      color: $color-secondary;
    }

    &.rank-3 {
      background: rgba(240, 171, 252, 0.2);
      color: $color-accent;
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
    letter-spacing: 0.03em;
  }

  &__value {
    font-family: $font-mono;
    font-size: 11px;
    color: $color-primary;
  }

  &__track {
    height: 3px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 2px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, $color-secondary, $color-primary);
    transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);

    &.rank-1 {
      background: linear-gradient(90deg, $color-primary, #e8c4a0);
    }
  }
}
</style>
