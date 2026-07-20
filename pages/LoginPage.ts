import { Frame, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsErrorPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.invalidCredentialsErrorPopup = page.getByRole("alert");
  }

  async gotoOrangeHRM() {
    await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }

  /**
   * login into OrangrHRM
   * @param userName
   * @param password
   */
  async loginOrangeHRM(userName: string, password: string) {
    console.log("username : ", userName);
    console.log("password : ", password);
    
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
