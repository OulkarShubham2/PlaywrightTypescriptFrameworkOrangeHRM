import { Locator, Page } from "@playwright/test";

export class DashBoardPage {
  readonly page: Page;
  readonly dashBoardTitleText: Locator;
  readonly quickLaunchTitle: Locator;
  readonly assignLeaveButton: Locator;
  readonly leaveListButton: Locator;
  readonly timesheetsButton: Locator;
  readonly applyLeaveButton: Locator;
  readonly myLeaveButton: Locator;
  readonly myTimesheetButton: Locator;
  readonly myActionsTitle: Locator;
  readonly timeAtWorkTitle: Locator;
  readonly buzzLatestPostsTitle: Locator;
  readonly employeesOnLeaveTodayTitle: Locator;
  readonly noEmployeesOnLeaveText: Locator;
  readonly employeeDistributionBySubUnitTitle: Locator;
  readonly employeeDistributionByLocationTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashBoardTitleText = page.getByRole("heading", { name: "Dashboard" });
    this.quickLaunchTitle = page.getByText("Quick Launch");
    this.assignLeaveButton = page.getByRole("button", { name: "Assign Leave" });
    this.leaveListButton = page.getByRole("button", { name: "Leave List" });
    this.timesheetsButton = page.getByRole("button", { name: "Timesheets" });
    this.applyLeaveButton = page.getByRole("button", { name: "Apply Leave" });
    this.myLeaveButton = page.getByRole("button", { name: "My Leave" });
    this.myTimesheetButton = page.getByRole("button", { name: "My Timesheet" });
    this.myActionsTitle = page.getByText("My Actions");
    this.timeAtWorkTitle = page.getByText("Time at Work");
    this.buzzLatestPostsTitle = page.getByText("Buzz Latest Posts");
    this.employeesOnLeaveTodayTitle = page.getByText("Employees on Leave Today");
    this.noEmployeesOnLeaveText = page.getByText("No Employees are on Leave Today");
    this.employeeDistributionBySubUnitTitle = page.getByText("Employee Distribution by Sub Unit");
    this.employeeDistributionByLocationTitle = page.getByText("Employee Distribution by Location");
  }

  async clickQuickLaunchOption(name: string) {
    await this.page.getByRole("button", { name }).click();
  }
}
