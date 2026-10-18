import { Page, Locator } from "@playwright/test";
import { LoggerUtil } from "../../utils/LoggerUtil";

export class OpenSourceLoginPage{
    readonly page:Page;

    constructor(page: Page){
        this.page = page;
    }

    get userNameInputField(): Locator {
        return this.page.getByRole('textbox', {name: 'UserName'});
    }

    get passwordInputField(): Locator{
        return this.page.getByRole('textbox', {name: 'Password'});
    }

    get loginButton(): Locator{
        return this.page.getByRole('button', {name: 'Login'});
    }

    async enterUserName(userName: string){
        await this.userNameInputField.fill(userName);
    }

    async enterPassword(password: string){
        await LoggerUtil.info('Password: '+ password);
        await this.passwordInputField.fill(password);
    }

    async clickOnLoginButton(){
        await this.loginButton.click();
    }

}