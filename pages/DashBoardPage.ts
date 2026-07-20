import { Locator, Page } from "@playwright/test";

export class DashBoardPage {
  readonly page : Page;
  readonly dashBoardTitleText : Locator

  constructor(page : Page){
    this.page = page;
    this.dashBoardTitleText = page.getByRole('heading', { name: 'Dashboard' });
  }
}
