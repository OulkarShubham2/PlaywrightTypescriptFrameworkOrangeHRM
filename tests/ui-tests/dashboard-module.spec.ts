import { expect, test } from "../../fixtures/hooks-fixture";

test.describe("Dashboard module @dashboard", () => {
  test("Verify dashboard landing page and visible dashboard widgets @smoke", async ({ page, dashBoardPage }) => {
    const baseUrl = process.env.BASE_URL || "https://opensource-demo.orangehrmlive.com";
    await page.goto(`${baseUrl}/web/index.php/dashboard/index`);
    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);

    await expect(dashBoardPage.dashBoardTitleText).toBeVisible();
    await expect(dashBoardPage.quickLaunchTitle).toBeVisible();
    await expect(dashBoardPage.myActionsTitle).toBeVisible();
    await expect(dashBoardPage.timeAtWorkTitle).toBeVisible();
    await expect(dashBoardPage.buzzLatestPostsTitle).toBeVisible();
    await expect(dashBoardPage.employeeDistributionBySubUnitTitle).toBeVisible();
    await expect(dashBoardPage.employeeDistributionByLocationTitle).toBeVisible();
  });

  test("Verify Quick Launch action and logout from dashboard @sanity", async ({ page, dashBoardPage, userPage }) => {
    const baseUrl = process.env.BASE_URL || "https://opensource-demo.orangehrmlive.com";
    await page.goto(`${baseUrl}/web/index.php/dashboard/index`);
    await expect(dashBoardPage.assignLeaveButton).toBeVisible();
    await expect(dashBoardPage.leaveListButton).toBeVisible();
    await expect(dashBoardPage.timesheetsButton).toBeVisible();
    await expect(dashBoardPage.applyLeaveButton).toBeVisible();
    await expect(dashBoardPage.myLeaveButton).toBeVisible();
    await expect(dashBoardPage.myTimesheetButton).toBeVisible();

    await dashBoardPage.clickQuickLaunchOption("Assign Leave");
    await expect(page).toHaveURL(/\/web\/index\.php\/leave\//);

    await userPage.logout();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  });
});
