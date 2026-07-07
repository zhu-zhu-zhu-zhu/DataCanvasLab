import type { EChartsOption } from 'echarts'

export const chartColors = ['#00e5ff', '#4f8cff', '#ffc14d', '#a78bfa', '#2dd4bf', '#ff6b8a']

export const baseChartTheme: EChartsOption = {
  backgroundColor: 'transparent',
  textStyle: {
    color: 'rgba(238, 246, 255, 0.88)',
    fontFamily: 'Rajdhani, sans-serif',
  },
  grid: {
    left: 44,
    right: 24,
    top: 48,
    bottom: 32,
    containLabel: true,
  },
  tooltip: {
    backgroundColor: 'rgba(4, 12, 28, 0.94)',
    borderColor: 'rgba(0, 229, 255, 0.45)',
    borderWidth: 1,
    extraCssText: 'box-shadow: 0 0 20px rgba(0,229,255,0.25); backdrop-filter: blur(8px);',
    textStyle: { color: '#eef6ff', fontSize: 12 },
  },
}

export function axisStyle() {
  return {
    axisLine: { lineStyle: { color: 'rgba(0, 229, 255, 0.25)', width: 1 } },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(238, 246, 255, 0.55)', fontSize: 10, fontFamily: 'Orbitron' },
    splitLine: { lineStyle: { color: 'rgba(0, 229, 255, 0.06)', type: 'dashed' as const } },
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
      { offset: 0, color: 'rgba(0, 229, 255, 0.45)' },
      { offset: 1, color: 'rgba(0, 229, 255, 0.02)' },
    ],
  }
}
