/**
 * DataCanvasLab 自动化截图脚本
 * 1. 构建项目并启动 preview 服务
 * 2. 使用 Playwright 截取大屏全屏与各区域截图
 * 3. 输出到 docs/assets/ 供 README 图文文档使用
 */
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'docs', 'assets')
const PORT = 4173
const BASE_URL = `http://127.0.0.1:${PORT}`

const REGIONS = [
  { name: '01-dashboard-full', selector: '.screen-layout__canvas', label: '大屏全貌' },
  { name: '02-header', selector: '.screen-header', label: '顶部标题栏' },
  { name: '03-overview-panel', selector: '.dashboard__col--left', label: '左侧概览区' },
  { name: '04-center-trend', selector: '.dashboard__col--center', label: '中央趋势图' },
  { name: '05-ranking-alerts', selector: '.dashboard__col--right', label: '右侧排行与告警' },
  { name: '06-footer-logs', selector: '.dashboard__footer', label: '底部滚动与日志' },
]

function runNpm(args) {
  return new Promise((resolve, reject) => {
    const isWin = process.platform === 'win32'
    const child = isWin
      ? spawn('cmd.exe', ['/d', '/s', '/c', 'npm', ...args], { cwd: ROOT, stdio: 'inherit' })
      : spawn('npm', args, { cwd: ROOT, stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve(undefined)
      else reject(new Error(`npm ${args.join(' ')} exited with code ${code}`))
    })
  })
}

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`Server not ready: ${url}`)
}

function startPreviewServer() {
  const isWin = process.platform === 'win32'
  return isWin
    ? spawn('cmd.exe', ['/d', '/s', '/c', 'npm', 'run', 'preview', '--', '--port', String(PORT), '--host', '127.0.0.1'], {
        cwd: ROOT,
        stdio: 'pipe',
      })
    : spawn('npm', ['run', 'preview', '--', '--port', String(PORT), '--host', '127.0.0.1'], {
        cwd: ROOT,
        stdio: 'pipe',
      })
}

async function captureScreenshots() {
  await mkdir(OUT_DIR, { recursive: true })

  console.log('\n📦 Building project (screenshot mode, mock enabled)...')
  await runNpm(['run', 'build:screenshot'])

  console.log('\n🚀 Starting preview server...')
  const server = startPreviewServer()

  try {
    await waitForServer(BASE_URL)
    console.log(`\n📸 Capturing screenshots from ${BASE_URL}`)

    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()

    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForSelector('.screen-header', { timeout: 20000 })
    // 等待 Pinia 异步 Mock 数据渲染完成
    await page.waitForFunction(
      () => document.querySelectorAll('.kpi-card').length >= 4,
      { timeout: 30000 },
    )
    await page.waitForTimeout(2500)

    const manifest = []

    for (const region of REGIONS) {
      const locator = page.locator(region.selector).first()
      await locator.waitFor({ state: 'visible', timeout: 10000 })
      const filePath = path.join(OUT_DIR, `${region.name}.png`)
      await locator.screenshot({ path: filePath })
      manifest.push({ file: `${region.name}.png`, label: region.label })
      console.log(`  ✓ ${region.name}.png — ${region.label}`)
    }

    // 额外：浏览器视口全屏（含缩放适配后的可视区域）
    await page.screenshot({
      path: path.join(OUT_DIR, '00-browser-viewport.png'),
      fullPage: false,
    })
    manifest.unshift({ file: '00-browser-viewport.png', label: '浏览器视口' })
    console.log('  ✓ 00-browser-viewport.png — 浏览器视口')

    await browser.close()

    const manifestPath = path.join(OUT_DIR, 'manifest.json')
    await import('node:fs/promises').then((fs) =>
      fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8'),
    )
    console.log(`\n✅ Screenshots saved to docs/assets/ (${manifest.length} files)`)
  } finally {
    server.kill('SIGTERM')
    await new Promise((r) => setTimeout(r, 800))
  }
}

captureScreenshots().catch((err) => {
  console.error('\n❌ Screenshot capture failed:', err.message)
  process.exit(1)
})
