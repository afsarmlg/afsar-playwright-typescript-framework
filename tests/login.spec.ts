import { test, Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import login from "../data/login.json";

test('login', async ({page})=>{

    await page.goto("/login");
    let loginPage = new LoginPage(page);
    await loginPage.login(login.userName, login.passWord);
    const pageHeader = page.locator('h4');
    await expect(pageHeader).toContainText("Welcome to the Secure Area");

});