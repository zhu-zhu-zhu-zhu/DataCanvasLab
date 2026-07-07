<script setup lang="ts">
import type { KpiItem } from '@/api/adapters/types'
import { formatNumber, formatPercent } from '@/utils/format'

defineProps<{
  item: KpiItem
}>()

function displayValue(item: KpiItem): string {
  return item.unit === '%' ? formatPercent(item.value) : formatNumber(item.value)
}
</script>

<template>
  <div class="kpi-card">
    <p class="kpi-card__label">{{ item.label }}</p>
    <p class="kpi-card__value">
      {{ displayValue(item) }}
      <span v-if="item.unit !== '%'" class="kpi-card__unit">{{ item.unit }}</span>
    </p>
    <p class="kpi-card__trend" :class="{ up: item.trend >= 0, down: item.trend < 0 }">
      {{ item.trend >= 0 ? '▲' : '▼' }} {{ Math.abs(item.trend).toFixed(1) }}%
    </p>
  </div>
</template>

<style scoped lang="scss">
.kpi-card {
  @include glass-panel;
  padding: 14px 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.18);
  }

  &__label {
    font-size: 13px;
    color: $color-text-dim;
    letter-spacing: 0.08em;
  }

  &__value {
    margin-top: 8px;
    font-family: $font-display;
    font-size: 28px;
    font-weight: 700;
    @include glow-text($color-primary);
  }

  &__unit {
    font-size: 14px;
    margin-left: 4px;
    color: $color-text-dim;
  }

  &__trend {
    margin-top: 6px;
    font-size: 12px;

    &.up {
      color: #34d399;
    }

    &.down {
      color: #fb7185;
    }
  }
}
</style>
