import { Locator, Page } from "@playwright/test";

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

  async gotoOrangeHRM(): Promise<void> {
    const environment = process.env.TEST_EXECUTION_ENV || "demo";
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
      throw new Error("BASE_URL environment variable is not defined");
    }

    console.log(`Running tests in: ${environment}`);
    console.log(`BASE_URL: ${baseUrl}`);

    await this.page.goto(
      `${baseUrl}/web/index.php/auth/login`,
      {
        waitUntil: "load",
        timeout: 120000,
      }
    );
  }

// async gotoOrangeHRM() {
//     console.log("TEST_EXECUTION_ENV =", process.env.TEST_EXECUTION_ENV);

//     if (process.env.TEST_EXECUTION_ENV === "demo") {
//         console.log("🔥 DEMO BLOCK");
        
//         await this.page.goto(
//             `${process.env.BASE_URL}/web/index.php/auth/login`,
//             {
//                 waitUntil: "load",
//                 timeout: 120000,
//             }
//         );

//     } else if (process.env.TEST_EXECUTION_ENV === "dev") {
//         console.log("🔥 DEV BLOCK");

//         await this.page.goto(
//             `${process.env.BASE_URL}/web/index.php/auth/login`,
//             {
//                 waitUntil: "load",
//                 timeout: 120000,
//             }
//         );

//     } else if (process.env.TEST_EXECUTION_ENV === "qa") {
//         console.log("🔥 QA BLOCK");

//         await this.page.goto(
//             `${process.env.BASE_URL}/web/index.php/auth/login`,
//             {
//                 waitUntil: "load",
//                 timeout: 120000,
//             }
//         );

//     } else {
//         throw new Error(
//             `Unknown TEST_EXECUTION_ENV: ${process.env.TEST_EXECUTION_ENV}`
//         );
//     }
// }

  // async gotoOrangeHRM() {
  //   if (process.env.TEST_EXECUTION_ENV == 'demo') {
  //     await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`, {
  //       waitUntil: "load",
  //       timeout: 120000,
  //     });
  //     console.log(`Tests are running in ${process.env.TEST_EXECUTION_ENV} env`)
  //   } else if (process.env.TEST_EXECUTION_ENV == 'dev') {
  //     await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`, {
  //       waitUntil: "load",
  //       timeout: 120000,
  //     });
  //     console.log(`Tests are running in ${process.env.TEST_EXECUTION_ENV} env`)
  //   } else if (process.env.TEST_EXECUTION_ENV == 'qa') {
  //     await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`, {
  //       waitUntil: "load",
  //       timeout: 120000,
  //     });
  //     console.log(`Tests are running in ${process.env.TEST_EXECUTION_ENV} env`)
  //   }
  // }

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
