import { test, expect } from "../../fixtures/hooks-fixture";
import {parse} from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

type TestRecords = {
    username:string,
    password:string,
    invalidCredText:string,
}

const records = parse(
    fs.readFileSync(path.join(__dirname,'../../data/ui-test-data/demo/login-module-data.csv')),
    {
        columns :true,
        skipEmptyLines:true
    }
) as TestRecords[];

for(const record of records){
 test(
        `[Login] csv Verify that the user cannot log int with an invalid: ${record.username} @csv`,
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