import { test, expect } from "../../fixtures/hooks-fixture";

// $env:SECRET_KEY="shubham"; npx playwright test....

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});


  test(
    `[Login] Verify that the user cannot log int with an invalid password. @sanity`,
    {
      tag: ["@UI", "@UAT"],
      annotation: {
        type: "Test case Link",
        description: "This is link of test case",
      },
    },
    async ({ gotoUrl, loginPage, commonUtils, testData}) => {
      const username = commonUtils.decryptData(process.env.USER_NAME!);
      await loginPage.loginOrangeHRM(username, String(testData.LoginTestData?.wrong_passw));
      await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(
        String(testData.LoginTestData?.invld_crd_txt),
      );
      await expect(loginPage.userNameInput).toBeVisible();
    },
  );
