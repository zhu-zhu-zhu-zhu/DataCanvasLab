<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import type { TrendPoint } from '@/api/adapters/types'
import BaseChart from './BaseChart.vue'
import { axisStyle, baseChartTheme, chartColors, neonLineGradient } from './chartTheme'

const props = defineProps<{
  data: TrendPoint[]
  title?: string
  variant?: 'primary' | 'secondary'
}>()

const lineColor = computed(() => (props.variant === 'secondary' ? chartColors[1] : chartColors[0]))

const option = computed((): EChartsOption => ({
  ...baseChartTheme,
  title: props.title
    ? {
        text: props.title,
        textStyle: { color: lineColor.value, fontSize: 12, fontFamily: 'Orbitron' },
        left: 0,
      }
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
      smooth: 0.35,
      symbol: 'circle',
      symbolSize: 5,
      showSymbol: false,
      data: props.data.map((d) => d.value),
      lineStyle: {
        color: lineColor.value,
        width: 2,
        shadowColor: lineColor.value,
        shadowBlur: 12,
      },
      itemStyle: {
        color: lineColor.value,
        borderColor: '#fff',
        borderWidth: 1,
      },
      emphasis: {
        scale: true,
        itemStyle: { shadowBlur: 16, shadowColor: lineColor.value },
      },
      areaStyle: { color: neonLineGradient() },
    },
  ],
}))
</script>

<template>
  <BaseChart :option="option" />
</template>
