import { defineConfig, devices } from "@playwright/test";

import dotenv from "dotenv";

dotenv.config({
  path: `env-files/.env.${process.env.TEST_EXECUTION_ENV || "demo"}`,
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/ui-tests",
  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown'),

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  //workers: 2,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: "always" }],
    ['github'],
    ["allure-playwright", { outputFolder: "playwright-report/allure-results" }],
  ],

  timeout: 150000,
  expect: {
    timeout: 30000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // baseURL: process.env.API_BASE_URL,
    // extraHTTPHeaders: {
    //   Accept: "application/json",
    //   'Content-Type': 'application/json'
    // },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "Setup",
    //   testMatch: "global-setup.ts",
    //   retries: 3,
    // },
    
    {
      name: "chromium",
      //dependencies: ["Setup"],
      //testIgnore: "global-setup.ts",

      use: {
        ...devices["Desktop Chrome"],
        storageState: "./playwright/.auth/auth.json",
      },
    },

    // {
    //   name: "firefox",
    //   dependencies: ["Setup"],
    //   testIgnore: "global.setup.ts",

    //   use: {
    //     ...devices["Desktop Firefox"],
    //     storageState: "./playwright/.auth/auth.json",
    //   },
    // },

    // {
    //   name: "webkit",
    //   dependencies: ["Setup"],
    //   testIgnore: "global.setup.ts",

    //   use: {
    //     ...devices["Desktop Safari"],
    //     storageState: "./playwright/.auth/auth.json",
    //   },
    // },

    {
      name: "apiTest",
      testDir: "./tests/api-tests",
      use: {
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    },

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
