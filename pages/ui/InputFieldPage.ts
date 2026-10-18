import {Page, Locator} from '@playwright/test';
export class InputFieldPage{
    readonly page: Page;
    
    constructor(page: Page){
        this.page = page;
        
    }

    get movieNameInput() : Locator {return this.page.locator('#movieNameInput');}
    get movieSubmitButton(): Locator { return this.page.getByRole('button', { name: 'Submit' }); }
    get movieReadValue(): Locator { return this.page.locator('#result-s01'); }
    
    get avengersInput(): Locator { return this.page.locator('#appendInput'); }
    get avengersReadValue(): Locator { return this.page.locator('#result-s02'); }

    get matrixFieldValue(): Locator { return this.page.locator('#readValueInput'); }
    get readValueButton(): Locator { return this.page.getByRole('button', { name: 'Read Value' }); }
    get matrixReadValue(): Locator { return this.page.locator('#result-s03'); }

    get inceptionInputField(): Locator { return this.page.locator('#clearInput'); }
    get inceptionClearButton(): Locator { return this.page.getByRole('button', { name: 'Clear' }); }
    get inceptionFieldValue(): Locator { return this.page.locator('#result-s04'); }

    get disabledInputField(): Locator { return this.page.locator('#disabledInput'); }
    get disabledFieldValue(): Locator { return this.page.locator('#result-s05'); }

    get readOnlyInputField(): Locator { return this.page.locator('#readonlyInput'); }
    get readOnlyFieldValue(): Locator { return this.page.locator('#result-s06'); }

    async enterMovieName(movieName: string){
        await this.movieNameInput.fill(movieName);
    }

    async clickSubmitMovieButton(){
        await this.movieSubmitButton.click();
    }

    async getEnteredMovieValue(): Promise<string>{
        return await this.movieReadValue.textContent()||'';
    }

    async appendAvengersInputAndPressTab(text: string){
        await this.avengersInput.click();
        await this.page.keyboard.type(text);
        await this.page.keyboard.press('Tab');
    }

    async getAppendedValueInAvengers(){
        return await this.avengersInput.textContent();
    }

    async getMatrixOriginalValue(){
        return await this.matrixFieldValue.textContent();
    }

    async clickReadValueButton(){
        await this.readValueButton.click();
    }

    async getMatrixAfterValue(){
        return await this.matrixReadValue.textContent();
    }

    async clearInceptionField(){
        await this.inceptionInputField.clear();
    }

    async clickInceptionButton(){
        await this.inceptionClearButton.click();
    }

    async getClearedInceptionValue(){
        return await this.inceptionFieldValue.innerText();
    }


}