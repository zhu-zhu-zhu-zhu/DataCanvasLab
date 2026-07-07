import type { EChartsOption } from 'echarts'

export const chartColors = ['#e8c896', '#b89bf8', '#f5b8fc', '#9ef0b8', '#f0c0c4', '#ff8fa3']

export const baseChartTheme: EChartsOption = {
  backgroundColor: 'transparent',
  textStyle: {
    color: 'rgba(245, 240, 235, 0.88)',
    fontFamily: 'DM Sans, sans-serif',
  },
  grid: {
    left: 44,
    right: 24,
    top: 48,
    bottom: 32,
    containLabel: true,
  },
  tooltip: {
    backgroundColor: 'rgba(18, 16, 26, 0.92)',
    borderColor: 'rgba(232, 200, 150, 0.4)',
    borderWidth: 1,
    extraCssText:
      'box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(167,139,250,0.15); backdrop-filter: blur(12px); border-radius: 6px;',
    textStyle: { color: '#f5f0eb', fontSize: 12 },
  },
}

export function axisStyle() {
  return {
    axisLine: { lineStyle: { color: 'rgba(232, 200, 150, 0.25)', width: 1 } },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(250, 247, 244, 0.55)', fontSize: 10, fontFamily: 'DM Sans' },
    splitLine: { lineStyle: { color: 'rgba(184, 155, 248, 0.08)', type: 'dashed' as const } },
  }
}

export function neonLineGradient() {
  return {
    type: 'linear' as const,
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(232, 200, 150, 0.42)' },
      { offset: 0.5, color: 'rgba(184, 155, 248, 0.14)' },
      { offset: 1, color: 'rgba(184, 155, 248, 0.02)' },
    ],
  }
}
