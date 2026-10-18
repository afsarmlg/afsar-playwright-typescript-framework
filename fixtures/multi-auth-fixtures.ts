import {test as base, expect, BrowserContext, Page} from '@playwright/test';


type MultiAuthFixtures = {
    adminPage: Page;
    customerPage: Page;
    adminContext : BrowserContext;
    customerContext: BrowserContext;
}

export const test = base.extend<MultiAuthFixtures>({
    adminContext : async({browser}, use)=>{
        const context = await browser.newContext({storageState: './.auth/admin.json'});
        await use(context);
        await context.close();
    },

    adminPage: async({adminContext}, use)=>{
        const page= await adminContext.newPage();
        await use(page);
        await page.close();
    },

    customerContext : async({browser}, use)=>{
        const context = await browser.newContext({storageState: './.auth/customer.json'});
        await use(context);
        await context.close();
    },

    customerPage: async({customerContext}, use)=>{
        const page = await customerContext.newPage();
        await use(page);
        await page.close();
    }
});

export {expect};