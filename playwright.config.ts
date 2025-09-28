import { defineConfig, devices } from '@playwright/test'
import { Dates } from 'cafe-utility'

export default defineConfig({
    testDir: './test',
    fullyParallel: false,
    forbidOnly: true,
    retries: 0,
    workers: 1,
    reporter: 'html',
    use: { trace: 'on-first-retry', baseURL: 'https://beeport.ethswarm.org', headless: true },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    timeout: Dates.minutes(1)
})
