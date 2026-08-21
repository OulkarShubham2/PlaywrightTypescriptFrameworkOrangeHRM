import { LeftnavigationPage } from "../../pages/LeftNavigationPage";
import { expect, test } from "../../fixtures/hooks-fixture";
import pimData from '../../data/ui-test-data/demo/pim-module-data.json';

 test('[PIM] Verify that a new employee is successfully created under the PIM module.',{
   tag:['@UI','@UAT','@PIM'],
   annotation:{
      type:'Test case Link',
      description:'This is link of test case'
   }
}
   ,async({gotoUrl, leftNavigationPage, pimPage})=>{
    await leftNavigationPage.openPimModule();
    await pimPage.addEmployee(pimData.first_name, pimData.middle_name, pimData.last_name);
    await expect(pimPage.newEmployeeNameHeading).toHaveText(`${pimData.first_name} ${pimData.last_name}`);
 })
