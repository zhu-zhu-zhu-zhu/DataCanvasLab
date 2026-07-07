<script setup lang="ts">
import type { KpiItem } from '@/api/adapters/types'
import { formatNumber, formatPercent } from '@/utils/format'

const props = defineProps<{
  item: KpiItem
  index?: number
}>()

function displayValue(item: KpiItem): string {
  return item.unit === '%' ? formatPercent(item.value) : formatNumber(item.value)
}

const accentColors = ['#00e5ff', '#4f8cff', '#ffc14d', '#8b5cf6']
const accent = () => accentColors[(props.index ?? 0) % accentColors.length]
</script>

<template>
  <div class="kpi-card" :style="{ '--kpi-accent': accent() }">
    <div class="kpi-card__corner kpi-card__corner--tl" />
    <div class="kpi-card__corner kpi-card__corner--br" />
    <div class="kpi-card__scan" />
    <p class="kpi-card__label">{{ item.label }}</p>
    <p class="kpi-card__value">
      {{ displayValue(item) }}
      <span v-if="item.unit !== '%'" class="kpi-card__unit">{{ item.unit }}</span>
    </p>
    <div class="kpi-card__footer">
      <span class="kpi-card__trend" :class="{ up: item.trend >= 0, down: item.trend < 0 }">
        {{ item.trend >= 0 ? '▲' : '▼' }} {{ Math.abs(item.trend).toFixed(1) }}%
      </span>
      <div class="kpi-card__bar">
        <div class="kpi-card__bar-fill" :style="{ width: `${Math.min(100, Math.abs(item.trend) * 8)}%` }" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.kpi-card {
  @include glass-panel;
  @include cyber-corners(10px, var(--kpi-accent));
  position: relative;
  padding: 14px 16px 12px;
  border-color: color-mix(in srgb, var(--kpi-accent) 25%, transparent);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 24px color-mix(in srgb, var(--kpi-accent) 25%, transparent);
  }

  &__corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid var(--kpi-accent);
    opacity: 0.7;

    &--tl {
      top: 4px;
      left: 4px;
      border-right: none;
      border-bottom: none;
    }

    &--br {
      bottom: 4px;
      right: 4px;
      border-left: none;
      border-top: none;
    }
  }

  &__scan {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--kpi-accent) 8%, transparent) 50%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover &__scan {
    opacity: 1;
    animation: scanMove 2s linear infinite;
  }

  &__label {
    font-size: 12px;
    color: $color-text-dim;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__value {
    margin-top: 10px;
    font-family: $font-display;
    font-size: 26px;
    font-weight: 700;
    color: var(--kpi-accent);
    text-shadow: 0 0 16px color-mix(in srgb, var(--kpi-accent) 40%, transparent);
  }

  &__unit {
    font-size: 13px;
    margin-left: 4px;
    color: $color-text-dim;
    font-weight: 400;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  &__trend {
    font-size: 11px;
    font-family: $font-display;
    flex-shrink: 0;

    &.up {
      color: $color-success;
    }

    &.down {
      color: $color-danger;
    }
  }

  &__bar {
    flex: 1;
    height: 3px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 2px;
    overflow: hidden;
  }

  &__bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--kpi-accent), transparent);
    border-radius: 2px;
    transition: width 0.6s ease;
  }
}
</style>
