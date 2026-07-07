<script setup lang="ts">
import { onMounted } from 'vue'
import ScreenLayout from '@/layouts/ScreenLayout.vue'
import ScreenHeader from '@/components/ScreenHeader.vue'
import TickerBar from '@/components/TickerBar.vue'
import LogPanel from '@/components/LogPanel.vue'
import PanelBox from '@/components/PanelBox.vue'
import OverviewKpiGrid from '@/modules/overview/components/OverviewKpiGrid.vue'
import OverviewPiePanel from '@/modules/overview/components/OverviewPiePanel.vue'
import OverviewBarPanel from '@/modules/overview/components/OverviewBarPanel.vue'
import TrafficTrendPanel from '@/modules/traffic/components/TrafficTrendPanel.vue'
import RankingPanel from '@/modules/ranking/components/RankingPanel.vue'
import RankingTrendPanel from '@/modules/ranking/components/RankingTrendPanel.vue'
import AlertPanel from '@/modules/alert/components/AlertPanel.vue'
import { useDashboardStore } from '@/stores/dashboard.store'
import { usePolling } from '@/composables/usePolling'
import { logger } from '@/core/logger'

const store = useDashboardStore()

onMounted(() => {
  logger.info('Dashboard mounted', { module: 'dashboard' })
})

usePolling(() => store.loadAll(), 30000)
</script>

<template>
  <ScreenLayout>
    <ScreenHeader />

    <main class="dashboard">
      <aside class="dashboard__col dashboard__col--left">
        <OverviewKpiGrid />
        <OverviewPiePanel />
        <OverviewBarPanel />
      </aside>

      <section class="dashboard__col dashboard__col--center">
        <TrafficTrendPanel />
      </section>

      <aside class="dashboard__col dashboard__col--right">
        <RankingPanel />
        <RankingTrendPanel />
        <AlertPanel />
      </aside>
    </main>

    <footer class="dashboard__footer">
      <div class="dashboard__ticker">
        <TickerBar />
      </div>
      <PanelBox title="系统日志" class="dashboard__logs" height="120px">
        <LogPanel />
      </PanelBox>
    </footer>
  </ScreenLayout>
</template>

<style scoped lang="scss">
.dashboard {
  flex: 1;
  display: grid;
  grid-template-columns: 420px 1fr 420px;
  gap: 16px;
  padding: 16px 20px;
  min-height: 0;
  overflow: hidden;

  &__col {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 0;

    &--center {
      min-height: 0;
    }
  }

  &__footer {
    padding: 0 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__ticker {
    @include glass-panel;
    padding: 10px 16px;
  }

  &__logs {
    :deep(.panel-box__body) {
      padding-top: 8px;
      padding-bottom: 8px;
    }
  }
}
</style>
