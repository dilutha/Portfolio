import { chromium } from 'playwright'
const BASE = 'http://localhost:5183'
const errors = []
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`[console] ${msg.text()}`) })
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({ path: 'v2-hero.png' })

// Wait through a full role-rotation cycle to catch "Business Information Systems"
await page.waitForTimeout(2700 * 3)
await page.screenshot({ path: 'v2-hero-role3.png' })

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4))
await page.waitForTimeout(500)
await page.screenshot({ path: 'v2-projects.png' })

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.62))
await page.waitForTimeout(500)
await page.screenshot({ path: 'v2-volunteer.png' })

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.78))
await page.waitForTimeout(500)
await page.screenshot({ path: 'v2-leadership.png' })

await browser.close()
console.log('ERRORS', JSON.stringify(errors))
