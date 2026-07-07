<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { memoryTransport } from '@/core/logger'
import type { LogEntry } from '@/core/logger/types'

const entries = ref<LogEntry[]>([])
let unsubscribe: (() => void) | null = null

onMounted(() => {
  unsubscribe = memoryTransport.subscribe((list) => {
    entries.value = list
  })
})

onUnmounted(() => {
  unsubscribe?.()
})

function levelClass(level: LogEntry['level']): string {
  return `log-${level}`
}
</script>

<template>
  <div class="log-panel">
    <div
      v-for="entry in entries.slice(0, 8)"
      :key="entry.id"
      class="log-panel__row"
      :class="levelClass(entry.level)"
    >
      <span class="log-panel__pipe" />
      <span class="log-panel__time">{{ new Date(entry.timestamp).toLocaleTimeString('zh-CN') }}</span>
      <span class="log-panel__level">{{ entry.level.toUpperCase() }}</span>
      <span class="log-panel__msg">{{ entry.message }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.log-panel {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 10px;
  max-height: 100%;
  overflow: hidden;

  &__row {
    display: grid;
    grid-template-columns: 3px 68px 46px 1fr;
    gap: 8px;
    align-items: center;
    padding: 4px 6px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    transition: background 0.15s;

    &:hover {
      background: rgba(0, 229, 255, 0.06);
    }
  }

  &__pipe {
    width: 3px;
    height: 14px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.15);
  }

  &.log-info .log-panel__pipe {
    background: $color-primary;
    box-shadow: 0 0 6px $color-primary;
  }

  &.log-warn .log-panel__pipe {
    background: $color-accent;
  }

  &.log-error .log-panel__pipe {
    background: $color-danger;
  }

  &__time {
    color: $color-text-dim;
  }

  &__level {
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  &.log-debug .log-panel__level {
    color: rgba(238, 246, 255, 0.4);
  }

  &.log-info .log-panel__level {
    color: $color-primary;
  }

  &.log-warn .log-panel__level {
    color: $color-accent;
  }

  &.log-error .log-panel__level {
    color: $color-danger;
  }

  &__msg {
    color: rgba(238, 246, 255, 0.82);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
