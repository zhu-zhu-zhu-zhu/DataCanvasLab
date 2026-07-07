<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard.store'
import KpiCard from '@/components/KpiCard.vue'

const store = useDashboardStore()
const items = computed(() => store.kpi?.items ?? [])
</script>

<template>
  <div class="kpi-grid">
    <KpiCard v-for="item in items" :key="item.key" :item="item" />
  </div>
</template>

<style scoped lang="scss">
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
</style>
