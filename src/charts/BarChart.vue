<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import type { CategoryItem } from '@/api/adapters/types'
import BaseChart from './BaseChart.vue'
import { axisStyle, baseChartTheme, chartColors } from './chartTheme'

const props = defineProps<{
  data: CategoryItem[]
  title?: string
}>()

const option = computed((): EChartsOption => ({
  ...baseChartTheme,
  title: props.title
    ? { text: props.title, textStyle: { color: '#e8c896', fontSize: 13 }, left: 0 }
    : undefined,
  xAxis: {
    type: 'category' as const,
    data: props.data.map((d) => d.name),
    ...axisStyle(),
  },
  yAxis: { type: 'value' as const, ...axisStyle() },
  series: [
    {
      type: 'bar' as const,
      data: props.data.map((d, i) => ({
        value: d.value,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: chartColors[i % chartColors.length] },
              { offset: 1, color: 'rgba(167, 139, 250, 0.12)' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      })),
      barWidth: '45%',
    },
  ],
}))
</script>

<template>
  <BaseChart :option="option" />
</template>
