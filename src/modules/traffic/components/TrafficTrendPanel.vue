<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard.store'
import PanelBox from '@/components/PanelBox.vue'
import LineChart from '@/charts/LineChart.vue'

const store = useDashboardStore()
const data = computed(() => store.trend)
</script>

<template>
  <PanelBox title="24小时城市流量趋势" height="100%" accent="gold">
    <div class="chart-wrap">
      <LineChart :data="data" />
    </div>
  </PanelBox>
</template>

<style scoped lang="scss">
.chart-wrap {
  height: 100%;
  min-height: 360px;
}
:deep(.panel-box) {
  height: 100%;
}

:deep(.panel-box__body) {
  height: calc(100% - 44px);
}
</style>
