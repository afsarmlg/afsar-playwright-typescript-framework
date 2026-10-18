import { test, Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import login from "../../data/login.json";

test.describe('login to herokuapp tag:regression', async()=>{


    test('login', async ({page})=>{

    await page.goto("https://the-internet.herokuapp.com/login");
    let loginPage = new LoginPage(page);
    await loginPage.login(login.userName, login.passWord);
    const pageHeader = page.locator('h4');
    await expect(pageHeader).toContainText("Welcome to the Secure Area");

    });
});
