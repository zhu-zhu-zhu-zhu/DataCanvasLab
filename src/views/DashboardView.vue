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
  gap: 18px;
  padding: 14px 22px;
  min-height: 0;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 8%;
    bottom: 8%;
    left: calc(420px + 22px + 9px);
    width: 1px;
    background: linear-gradient(180deg, transparent, rgba(0, 229, 255, 0.2), transparent);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 8%;
    bottom: 8%;
    right: calc(420px + 22px + 9px);
    width: 1px;
    background: linear-gradient(180deg, transparent, rgba(0, 229, 255, 0.2), transparent);
    pointer-events: none;
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 0;

    &--center {
      min-height: 0;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        inset: -4px;
        border: 1px solid rgba(255, 193, 77, 0.08);
        pointer-events: none;
        z-index: 0;
      }
    }
  }

  &__footer {
    padding: 0 22px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__ticker {
    @include glass-panel;
    @include cyber-corners(12px, rgba(255, 193, 77, 0.4));
    padding: 10px 16px;
    border-color: rgba(255, 193, 77, 0.15);
  }

  &__logs {
    :deep(.panel-box__body) {
      padding-top: 6px;
      padding-bottom: 6px;
    }
  }
}
</style>
