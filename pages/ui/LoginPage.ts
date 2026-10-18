import { Locator, Page } from "@playwright/test";

export class LoginPage{
    readonly page:Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor (page: Page){
        this.page= page;
        this.userNameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.getByRole('button', {name: 'Login'});

    }

    async login(userName: string, password: string){
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}