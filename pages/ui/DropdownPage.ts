import {Page, Locator} from '@playwright/test';

export class DropdownPage{
    readonly page: Page;
    constructor(page: Page){
        this.page= page;
    }

    get selectFruitDropdownLocator() : Locator {return this.page.getByTestId('fruit-select');}
    get selectedDropdownValue() : Locator {return this.page.getByTestId('result-s01');}
    get countryDropdown(): Locator {
    // Tip: QA Playground uses standard id attributes like #countrySelect
    return this.page.locator('#countrySelect'); 
    }


    async selectFruitDropdown(option: string){
        await this.selectFruitDropdownLocator.selectOption(option);
    }
    // 🚀 Pointer to the unique results status box for Section S02
    get countryResultStatus(): Locator {
        // Update 'result-s02' to match the actual data-testid or ID in your browser console
        return this.page.getByTestId('result-s02'); 
    }

    // 🛠️ Action Method: Selecting specifically by the value attribute
    async selectCountryByValue(countryValue: string) {
        // Selects the option where value="countryValue" (e.g. value="india")
        await this.countryDropdown.selectOption(countryValue); 
    }
}