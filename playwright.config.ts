import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

dotenv.config({path: path.resolve(__dirname, './.env')})

const currentEnv = process.env.Env || 'qa';
const selectedSuite = process.env.SUITE;
let calculatedBaseUrl = '';

const configPath = path.resolve(__dirname, './config/environments.config.ts');

if(fs.existsSync(configPath)){
  const {environments} = require('./config/environments.config');
  calculatedBaseUrl = environments[currentEnv].baseUrl || environments.qa.baseUrl;
}else{
  calculatedBaseUrl = process.env.BASE_URL || '';
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  grep: selectedSuite ? RegExp(`tag:${selectedSuite}`): undefined,
  reporter: [
    ['html', { open: 'never' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: calculatedBaseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup-admin',
      testMatch : '/auth\.admin\.setup\.ts',

    },
    {
      name: 'setup-customer',
      testMatch : '/auth\.customer\.setup\.ts',
    },
    // {
    //   name: 'admin-tests',
    //   use: {
    //     storageState: './.auth/admin.json',
    //   },
    //   dependencies: ['setup-admin']
    // },
    // {
    //   name: 'customer-tests',
    //   use: {
    //     storageState: './.auth/customer.json',
    //   },
    //   dependencies:['setup-customer']
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup-admin', 'setup-customer']
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
