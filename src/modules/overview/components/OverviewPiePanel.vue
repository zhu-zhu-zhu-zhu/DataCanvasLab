<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard.store'
import PanelBox from '@/components/PanelBox.vue'
import PieChart from '@/charts/PieChart.vue'

const store = useDashboardStore()
const data = computed(() => store.category)
</script>

<template>
  <PanelBox title="城市事件分类占比" height="240px">
    <PieChart :data="data" />
  </PanelBox>
</template>
