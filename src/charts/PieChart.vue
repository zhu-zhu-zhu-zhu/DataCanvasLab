<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import type { CategoryItem } from '@/api/adapters/types'
import BaseChart from './BaseChart.vue'
import { baseChartTheme, chartColors } from './chartTheme'

const props = defineProps<{
  data: CategoryItem[]
  title?: string
}>()

const option = computed((): EChartsOption => ({
  ...baseChartTheme,
  title: props.title
    ? { text: props.title, textStyle: { color: '#00d4ff', fontSize: 13 }, left: 'center' }
    : undefined,
  legend: {
    orient: 'vertical' as const,
    right: 0,
    top: 'center',
    textStyle: { color: 'rgba(232,244,255,0.7)', fontSize: 11 },
  },
  series: [
    {
      type: 'pie' as const,
      radius: ['42%', '68%'],
      center: ['38%', '55%'],
      data: props.data.map((d, i) => ({
        name: d.name,
        value: d.value,
        itemStyle: { color: chartColors[i % chartColors.length] },
      })),
      label: { color: 'rgba(232,244,255,0.75)', fontSize: 11 },
      emphasis: {
        scale: true,
        itemStyle: { shadowBlur: 16, shadowColor: 'rgba(0,212,255,0.45)' },
      },
    },
  ],
}))
</script>

<template>
  <BaseChart :option="option" />
</template>
