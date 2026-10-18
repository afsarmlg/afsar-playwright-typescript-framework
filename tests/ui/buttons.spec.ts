import {expect, Page, test} from '@playwright/test';
import {ButtonsPage} from '../../pages/ui/ButtonsPage';
import { DropdownPage } from '../../pages/ui/DropdownPage';
import { ScreenshotUtil } from '../../utils/ScreenshotUtil';

test.describe('Buttons page tag:@smoke', async()=>{
    let buttonsPage: ButtonsPage;
    let dropdownPage : DropdownPage;
    let sharedPage: Page;
    test.beforeAll('browser session', async({browser})=>{
        const context = await browser.newContext();
        sharedPage = await context.newPage();
        buttonsPage = new ButtonsPage(sharedPage);
        dropdownPage = new DropdownPage(sharedPage);
        await sharedPage.goto('https://qaplayground.com/practice/dropdowns');

    });

    test.afterAll('close session', async()=>{
        await sharedPage.close();
    });

    test('select options', async({}, testInfo)=>{
        await dropdownPage.selectFruitDropdown('Banana');
        await expect(dropdownPage.page.locator('text=: Banana')).toBeVisible();
        await ScreenshotUtil.captureScreenshot(sharedPage, testInfo);
    });

    test('Should select country by value attribute and verify output', async ({}, testInfo) => {
        // 1. Select 'India' by passing its exact lowercase value attribute string
        await dropdownPage.selectCountryByValue('india');
        
        // 2. Technical Validation: Verify that the element value property updated
        await expect(dropdownPage.countryDropdown).toHaveValue('india');
        
        // 3. 🛡️ Visual Synchronization: Wait for the result label element to display the selection
        // This blocks the runner until the text updates, guaranteeing a perfect report screenshot!
        await expect(dropdownPage.countryResultStatus).toContainText('Selected country: India');
        await ScreenshotUtil.captureScreenshot(sharedPage, testInfo);
    });
});