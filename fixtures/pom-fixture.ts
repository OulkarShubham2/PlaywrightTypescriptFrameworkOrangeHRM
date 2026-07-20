import { DashBoardPage } from "../pages/DashBoardPage";
import { LeftnavigationPage } from "../pages/LeftNavigationPage";
import { LoginPage } from "../pages/LoginPage";
import { PimPage } from "../pages/PimPage";
import { UserPage } from "../pages/UserPage";
import { test as baseTest } from "@playwright/test";

type PomFixturesType = {
  loginPage: LoginPage;
  dashBoardPage: DashBoardPage;
  userPage: UserPage;
  leftNavigationPage: LeftnavigationPage;
  pimPage: PimPage;
};

export const test = baseTest.extend<PomFixturesType>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  dashBoardPage: async ({ page }, use) => {
    await use(new DashBoardPage(page));
  },

  userPage: async ({ page }, use) => {
    await use(new UserPage(page));
  },

  leftNavigationPage: async ({ page }, use) => {
    await use(new LeftnavigationPage(page));
  },

  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },
});
