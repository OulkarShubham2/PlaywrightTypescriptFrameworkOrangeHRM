import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({
  path: `env-files/.env.${process.env.TEST_EXECUTION_ENV || "demo"}`,
});

export default defineConfig({
  testDir: "./tests/ui-tests",
  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown'),

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  //workers: 2,

  reporter: [
    ["html", { open: "always" }],
    ['github'],
    ["allure-playwright", { outputFolder: "playwright-report/allure-results" }],
  ],

  timeout: 120000,
  expect: {
    timeout: 30000,
  },

  use: {
    // baseURL: process.env.API_BASE_URL,
    // extraHTTPHeaders: {
    //   Accept: "application/json",
    //   'Content-Type': 'application/json'
    // },

    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

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
