<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard.store'
import PanelBox from '@/components/PanelBox.vue'
import AlertList from '@/components/AlertList.vue'

const store = useDashboardStore()
const items = computed(() => store.alerts)
</script>

<template>
  <PanelBox title="实时告警" height="260px" accent="violet">
    <AlertList :items="items" />
  </PanelBox>
</template>

<style scoped lang="scss">
:deep(.panel-box__body) {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
