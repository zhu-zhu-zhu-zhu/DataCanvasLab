<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard.store'
import PanelBox from '@/components/PanelBox.vue'
import BarChart from '@/charts/BarChart.vue'

const store = useDashboardStore()
const data = computed(() => store.category)
</script>

<template>
  <PanelBox title="区域业务对比" height="260px">
    <BarChart :data="data" />
  </PanelBox>
</template>
