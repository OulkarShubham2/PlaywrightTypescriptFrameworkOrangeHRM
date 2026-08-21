import { test, expect } from "../../fixtures/hooks-fixture";
import { TestDataArray } from "../../interface/LoginTestDataArray.interface";
import { loadTestData } from "../../utils/JsonHelper";


// $env:SECRET_KEY="shubham"; npx playwright test....

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

(async () => {
 const testDataArray = loadTestData<TestDataArray>();
// const loginTestData = testData.LoginTestData;

// for (const user of  testData.LoginTestData) {
for (const user of testDataArray.LoginTestDataArray ?? []) {
  test(
    `[Login] Verify that the user cannot log int with an invalid password. @Array @sanity${user.wrong_usrnm}`,
    {
      tag: ["@UI", "@UAT"],
      annotation: {
        type: "Test case Link",
        description: "This is link of test case",
      },
    },
    async ({ gotoUrl, loginPage, commonUtils  }) => {
      const username = commonUtils.decryptData(process.env.USER_NAME!);
      await loginPage.loginOrangeHRM(username, String(user.wrong_passw));
      await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(
        String(user.invld_crd_txt),
      );
      await expect(loginPage.userNameInput).toBeVisible();
    },
  );
}
})();

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
      test(
        `[Login] Verify that the user cannot log int with an invalid username.`,
        {
          tag: ["@UI", "@UAT","@Login"],
          annotation: {
            type: "Test case Link",
            description: "This is link of test case",
          },
        },
        async ({ gotoUrl, loginPage, commonUtils, testData }) => {
          const password = commonUtils.decryptData(process.env.PASSWORD!);
          await loginPage.loginOrangeHRM(String(testData.LoginTestData?.wrong_passw), password);
          await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(
            String(testData.LoginTestData?.invld_crd_txt),
          );
          await expect(loginPage.userNameInput).toBeVisible();
        },
      );


      test(
        `[Login] Verify that the user cannot log int with an invalid username and password.`,
        {
          tag: ["@UI", "@UAT"],
          annotation: {
            type: "Test case Link",
            description: "This is link of test case",
          },
        },
        async ({ gotoUrl, loginPage , testData}) => {
          await loginPage.loginOrangeHRM(String(testData.LoginTestData?.wrong_usrnm), String(testData.LoginTestData?.wrong_passw));
          await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(
            String(testData.LoginTestData?.invld_crd_txt),
          );
          await expect(loginPage.userNameInput).toBeVisible();
        },
      );
    }
);
