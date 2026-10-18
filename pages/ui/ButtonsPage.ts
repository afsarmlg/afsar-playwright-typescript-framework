import {Page, Locator} from '@playwright/test';

export class ButtonsPage{
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get doubleClickButton() : Locator {return this.page.locator('#doubleClickBtn');}

    get checkBoxInput() : Locator { return this.page.getByTestId('chk-accept-terms');}

    async doubleClickMe(){
        await this.doubleClickButton.dblclick();
    }

    async selectCheckBox(){
        await this.checkBoxInput.check();
    }
}