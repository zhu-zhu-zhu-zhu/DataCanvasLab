<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard.store'
import PanelBox from '@/components/PanelBox.vue'
import RankList from '@/components/RankList.vue'

const store = useDashboardStore()
const items = computed(() => store.ranking)
</script>

<template>
  <PanelBox title="区域综合评分 Top5" height="240px">
    <RankList :items="items" />
  </PanelBox>
</template>
