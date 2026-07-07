<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import type { TrendPoint } from '@/api/adapters/types'
import BaseChart from './BaseChart.vue'
import { axisStyle, baseChartTheme, chartColors } from './chartTheme'

const props = defineProps<{
  data: TrendPoint[]
  title?: string
}>()

const option = computed((): EChartsOption => ({
  ...baseChartTheme,
  title: props.title
    ? { text: props.title, textStyle: { color: '#00d4ff', fontSize: 13 }, left: 0 }
    : undefined,
  xAxis: {
    type: 'category' as const,
    data: props.data.map((d) => d.hour),
    boundaryGap: false,
    ...axisStyle(),
  },
  yAxis: { type: 'value' as const, ...axisStyle() },
  series: [
    {
      type: 'line' as const,
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      data: props.data.map((d) => d.value),
      lineStyle: { color: chartColors[0], width: 2 },
      itemStyle: { color: chartColors[0] },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(0, 212, 255, 0.35)' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.02)' },
          ],
        },
      },
    },
  ],
}))
</script>

<template>
  <BaseChart :option="option" />
</template>
