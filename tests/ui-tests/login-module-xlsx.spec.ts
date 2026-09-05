import { test, expect } from "../../fixtures/hooks-fixture";
import path from 'path';
import { readExcelFile } from "../../utils/ExcelHelper";
import { read } from "xlsx";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

const filePath = path.join(__dirname,'../../data/ui-test-data/demo/login-module-data.xlsx');
const records = readExcelFile(filePath);

for(const record of records){
 test(
        `[Login] excel Verify that the user cannot log int with an invalid: ${record.username} @excel`,
        {
          tag: ["@UI", "@UAT"],
          annotation: {
            type: "Test case Link",
            description: "This is link of test case",
          },
        },
        async ({ gotoUrl, loginPage , testData}) => {
          await loginPage.loginOrangeHRM(String(record.username), String(record.password));
          await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(
            String(record.invalidCredText),
          );
          await expect(loginPage.userNameInput).toBeVisible();
        },
      );
    }