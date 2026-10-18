import { Page, Locator } from "@playwright/test";

export class PractiseElementsPage{
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get inputFields(): Locator {return this.page.getByTestId('new-practice-card-input-fields');}

    async clickOnInputFieldsLink(){
        await this.inputFields.click();
    }
}