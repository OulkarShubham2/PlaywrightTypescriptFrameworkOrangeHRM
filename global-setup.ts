import { chromium, FullConfig ,expect} from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashBoardPage } from './pages/DashBoardPage';
import CommonUtils from './utils/CommonUtils';

async function globalSetup(config: FullConfig) {

  const maxRetries = 2;
  const totalAttempts = maxRetries + 1;

  let lastError: unknown;

  for (let attempt = 1; attempt <= totalAttempts; attempt++) {

    console.log(
      `========== GLOBAL SETUP ATTEMPT ${attempt}/${totalAttempts} ==========`
    );

    let browser;

    try {

      browser = await chromium.launch();

      const context = await browser.newContext();

      const page = await context.newPage();

      // Create page objects
      const loginPage = new LoginPage(page);
      const dashBoardPage = new DashBoardPage(page);

      // Create utility object
      const commonUtils = new CommonUtils();

      // Decrypt credentials
      const decryptedUserName =
        commonUtils.decryptData(process.env.USER_NAME!);

      const decryptedPassword =
        commonUtils.decryptData(process.env.PASSWORD!);

      console.log(
        `Environment: ${process.env.TEST_EXECUTION_ENV}`
      );

      console.log(
        `Base URL: ${process.env.BASE_URL}`
      );

      // Navigate to application
      await loginPage.gotoOrangeHRM();

      // Login
      await loginPage.loginOrangeHRM(
        decryptedUserName,
        decryptedPassword
      );

      // Wait for dashboard
      await page.waitForURL(
        `${process.env.BASE_URL}/web/index.php/dashboard/index`,
        {
          timeout: 30000
        }
      );

      // Verify dashboard
      await dashBoardPage.dashBoardTitleText.waitFor({
        state: 'visible',
        timeout: 10000
      });

      await expect(
        dashBoardPage.dashBoardTitleText
      ).toHaveText('Dashboard');

      // Save authentication state
      await context.storageState({
        path: './playwright/.auth/auth.json'
      });

      console.log(
        'Authentication state saved successfully'
      );

      console.log(
        '========== GLOBAL SETUP COMPLETED =========='
      );

      // IMPORTANT:
      // Exit retry loop because setup succeeded
      return;

    } catch (error) {

      lastError = error;

      console.error(
        `GLOBAL SETUP ATTEMPT ${attempt} FAILED`
      );

      console.error(error);

      if (attempt < totalAttempts) {

        console.log(
          `Retrying global setup... ` +
          `Next attempt: ${attempt + 1}/${totalAttempts}`
        );

        // Optional delay before retry
        await new Promise(resolve =>
          setTimeout(resolve, 3000)
        );

      } else {

        console.error(
          'GLOBAL SETUP FAILED AFTER ALL RETRIES'
        );

      }

    } finally {

      if (browser) {
        await browser.close();
      }

    }
  }

  // All attempts failed
  throw lastError;
}

export default globalSetup;