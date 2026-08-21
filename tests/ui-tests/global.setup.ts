// import { test } from "../../fixtures/commom-fixture";
// import {expect} from '@playwright/test';

// test('Global Setup for Auto Login', async({page,loginPage,dashBoardPage,commonUtils})=>{
//       const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!);
//       const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);
    
//       await loginPage.gotoOrangeHRM();
//       await loginPage.loginOrangeHRM(decryptedUserName,decryptedPassword);
//       await page.waitForURL(process.env.BASE_URL +'/web/index.php/dashboard/index');
//       await expect(dashBoardPage.dashBoardTitleText).toHaveText('Dashboard');
//       await page.context().storageState({
//         path:'./playwright/.auth/auth.json'
//       })
// })