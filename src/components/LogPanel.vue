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
    <div v-for="entry in entries.slice(0, 8)" :key="entry.id" class="log-panel__row" :class="levelClass(entry.level)">
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
  gap: 4px;
  font-family: 'Consolas', monospace;
  font-size: 11px;
  max-height: 100%;
  overflow: hidden;

  &__row {
    display: grid;
    grid-template-columns: 72px 52px 1fr;
    gap: 8px;
    padding: 3px 0;
    border-bottom: 1px solid rgba(0, 212, 255, 0.06);
  }

  &__time {
    color: $color-text-dim;
  }

  &__level {
    font-weight: 700;
  }

  .log-debug .log-panel__level {
    color: rgba(232, 244, 255, 0.45);
  }

  .log-info .log-panel__level {
    color: $color-primary;
  }

  .log-warn .log-panel__level {
    color: $color-accent;
  }

  .log-error .log-panel__level {
    color: #fb7185;
  }

  &__msg {
    color: rgba(232, 244, 255, 0.85);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
