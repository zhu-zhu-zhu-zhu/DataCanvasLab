<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard.store'
import PanelBox from '@/components/PanelBox.vue'
import LineChart from '@/charts/LineChart.vue'

const store = useDashboardStore()
const data = computed(() => store.trend.slice(0, 12))
</script>

<template>
  <PanelBox title="在线服务趋势" height="220px">
    <LineChart :data="data" />
  </PanelBox>
</template>
