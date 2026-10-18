import { Page, Locator } from "@playwright/test";

export class MenuPage{
    readonly page: Page;
    constructor(page: Page){
        this.page = page;
    }
    get startPractisingButton() : Locator { return this.page.getByTestId('hero-start-practicing')};

    async clickOnStartPractisingFree(){
        await this.startPractisingButton.click();
    }

}