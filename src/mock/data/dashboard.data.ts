import type { AlertItem, CategoryItem, KpiOverview, RankItem, TrendPoint } from '@/api/adapters/types'

export const kpiOverviewData: KpiOverview = {
  updatedAt: new Date().toISOString(),
  items: [
    { key: 'visits', label: '今日访问量', value: 128456, unit: '次', trend: 12.5 },
    { key: 'online', label: '在线用户', value: 8642, unit: '人', trend: 5.2 },
    { key: 'orders', label: '订单量', value: 3256, unit: '单', trend: -2.1 },
    { key: 'conversion', label: '转化率', value: 8.6, unit: '%', trend: 1.3 },
  ],
}

export const trafficTrendData: TrendPoint[] = Array.from({ length: 24 }, (_, i) => {
  const hour = `${String(i).padStart(2, '0')}:00`
  const peak = i >= 9 && i <= 22
  const base = peak ? 3000 + Math.sin((i - 9) / 4) * 1200 : 400 + i * 20
  return { hour, value: Math.round(base + Math.random() * 300) }
})

export const categoryDistributionData: CategoryItem[] = [
  { name: '智慧交通', value: 32 },
  { name: '公共安全', value: 24 },
  { name: '城市治理', value: 18 },
  { name: '生态环境', value: 15 },
  { name: '民生服务', value: 11 },
]

export const rankingData: RankItem[] = [
  { rank: 1, name: '浦东新区', value: 9821, unit: '分' },
  { rank: 2, name: '南山区', value: 9560, unit: '分' },
  { rank: 3, name: '天河区', value: 9312, unit: '分' },
  { rank: 4, name: '滨江区', value: 9088, unit: '分' },
  { rank: 5, name: '高新区', value: 8876, unit: '分' },
]

export const alertsData: AlertItem[] = [
  { id: '1', level: 'error', time: '16:42:08', message: 'CBD 区域交通指数超过阈值 85' },
  { id: '2', level: 'warn', time: '16:40:15', message: '供水管网压力波动，已通知运维' },
  { id: '3', level: 'info', time: '16:38:22', message: '智慧路灯批量升级完成 98%' },
  { id: '4', level: 'warn', time: '16:35:01', message: '空气质量监测站 #12 数据延迟' },
  { id: '5', level: 'info', time: '16:32:44', message: '城市事件工单已自动分派 126 条' },
  { id: '6', level: 'error', time: '16:30:18', message: '地铁 3 号线客流预警，启动疏导方案' },
  { id: '7', level: 'info', time: '16:28:55', message: '停车诱导系统同步成功' },
  { id: '8', level: 'warn', time: '16:25:33', message: '河道水位传感器 #7 信号弱' },
  { id: '9', level: 'info', time: '16:22:10', message: '政务热线接通率 96.2%' },
  { id: '10', level: 'warn', time: '16:18:47', message: '边缘计算节点负载偏高' },
]

export const tickerMessages: string[] = [
  '城市大脑实时接入 128 个感知设备',
  '今日累计处理城市事件 3,256 起',
  '智慧交通优化方案已覆盖 12 条主干道',
  '公共能耗监测平台运行稳定',
  '12345 热线平均响应时长 18 秒',
]
