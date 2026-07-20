import { test, expect } from "../../fixtures/hooks-fixture";
import lgnMData from "../../data/ui-test-data/login-module-data.json";

// $env:SECRET_KEY="shubham"; npx playwright test

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});
for (const user of lgnMData) {
  test(
    `[Login] Verify that the user cannot log int with an invalid password. @sanity${user.wrng_usrnm}`,
    {
      tag: ["@UI", "@UAT"],
      annotation: {
        type: "Test case Link",
        description: "This is link of test case",
      },
    },
    async ({ gotoUrl, loginPage, commonUtils }) => {
      const username = commonUtils.decryptData(process.env.USER_NAME!);
      await loginPage.loginOrangeHRM(username, user.wrong_passw);
      await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(
        user.invld_crd_txt,
      );
      await expect(loginPage.userNameInput).toBeVisible();
    },
  );
}
test.describe(
  "Invalid Login Test",
  {
    tag: "@InvalidLogin",
    annotation: {
      type: "Story link",
      description: "link of story",
    },
  },
  () => {
    for (const user of lgnMData) {
      test(
        `[Login] Verify that the user cannot log int with an invalid username.${user.wrng_usrnm}`,
        {
          tag: ["@UI", "@UAT"],
          annotation: {
            type: "Test case Link",
            description: "This is link of test case",
          },
        },
        async ({ gotoUrl, loginPage, commonUtils }) => {
          const password = commonUtils.decryptData(process.env.PASSWORD!);
          await loginPage.loginOrangeHRM(user.wrong_passw, password);
          await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(
            user.invld_crd_txt,
          );
          await expect(loginPage.userNameInput).toBeVisible();
        },
      );
    }

    for (const user of lgnMData) {
      test(
        `[Login] Verify that the user cannot log int with an invalid username and password. for ${user.wrng_usrnm}`,
        {
          tag: ["@UI", "@UAT"],
          annotation: {
            type: "Test case Link",
            description: "This is link of test case",
          },
        },
        async ({ gotoUrl, loginPage }) => {
          await loginPage.loginOrangeHRM(user.wrng_usrnm, user.wrong_passw);
          await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(
            user.invld_crd_txt,
          );
          await expect(loginPage.userNameInput).toBeVisible();
        },
      );
    }
  },
);
