import { Locator, Page } from "@playwright/test";

export class PimPage{
    readonly page: Page;
    readonly addPimButton : Locator;
    readonly firstNameTextBox: Locator;
    readonly middleNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly saveButton: Locator;
    readonly newEmployeeNameHeading : Locator;

    constructor (page: Page){
        this.page = page;
        this.addPimButton = page.getByRole('button', { name: 'Add' });
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameTextBox= page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameTextBox= page.getByRole('textbox', { name: 'Last Name' });
        this.saveButton= page.getByRole('button', { name: 'Save' });
        this.newEmployeeNameHeading = page.locator('.oxd-text.oxd-text--h6.--strong');
    }

    async addEmployee(firtName: string, middleName:string, lastName:string){
        await this.addPimButton.click();
        await this.firstNameTextBox.waitFor({ state: 'visible', timeout: 30000 });
        await this.firstNameTextBox.fill(firtName);
        await this.middleNameTextBox.fill(middleName);
        await this.lastNameTextBox.fill(lastName);
        await this.saveButton.click();
        await this.page.waitForURL(/.*\/pim\/viewPersonalDetails\/empNumber\/.*/, { timeout: 30000 });
        await this.newEmployeeNameHeading.waitFor({ state: 'visible', timeout: 30000 });
    }
}
