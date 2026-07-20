import {test as baseTest} from './commom-fixture';

type HooksFixtureType = {
    gotoUrl: void;
}

export const test = baseTest.extend<HooksFixtureType>({
    gotoUrl: async({loginPage}, use)=>{
        await loginPage.gotoOrangeHRM();
        await use();
    },
})

export{expect} from '@playwright/test';