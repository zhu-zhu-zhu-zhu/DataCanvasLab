<script setup lang="ts">
import { computed, provide } from 'vue'
import VChart, { THEME_KEY } from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import type { EChartsOption } from 'echarts'

use([CanvasRenderer, LineChart, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

provide(THEME_KEY, 'dark')

const props = defineProps<{
  option: EChartsOption
  height?: string
}>()

const chartHeight = computed(() => props.height ?? '100%')
</script>

<template>
  <VChart :option="option" autoresize :style="{ width: '100%', height: chartHeight }" />
</template>
