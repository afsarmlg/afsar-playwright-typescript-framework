import { test, Page, expect } from "@playwright/test";
import { InputFieldPage } from "../../pages/ui/InputFieldPage";
import { ScreenshotUtil } from "../../utils/ScreenshotUtil";
import { MenuPage } from "../../pages/ui/MenuPage";
import { PractiseElementsPage } from "../../pages/ui/PracticeElementsPage";

test.describe('QA Validations tag:smoke', async()=>{
    let inputFieldPage : InputFieldPage;
    let menuPage: MenuPage;
    let sharedPage : Page;
    let practiceElementsPage: PractiseElementsPage;
    test.describe.configure({mode: 'serial'});

test.beforeAll('launch ui', async({browser})=>{
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    practiceElementsPage = new PractiseElementsPage(sharedPage);
    inputFieldPage = new InputFieldPage(sharedPage);
    menuPage = new MenuPage(sharedPage);
    await sharedPage.goto('/');
});

test.afterAll('closing', async()=>{
    await sharedPage.close();
});

test('Enter Movie', async ({}, testInfo)=>{
    await menuPage.clickOnStartPractisingFree();
    await practiceElementsPage.clickOnInputFieldsLink();
    await inputFieldPage.enterMovieName('Avatar');
    await inputFieldPage.clickSubmitMovieButton();
    let movieValue = await inputFieldPage.getEnteredMovieValue();
    expect(movieValue).toContain('Avatar');
    await ScreenshotUtil.captureScreenshot(sharedPage, testInfo);

});

test('Append text', async ({}, testInfo)=>{
    await inputFieldPage.appendAvengersInputAndPressTab('Endgame');
    await expect(inputFieldPage.avengersReadValue).toContainText('AvengersEndgame');
    await ScreenshotUtil.captureScreenshot(sharedPage, testInfo);
});

test('Read field text', async ()=>{
    //let matrixOriginalValue = await inputFieldPage.getMatrixOriginalValue();
    await expect(inputFieldPage.matrixFieldValue).toHaveValue('The Matrix');
});

test('Clear field text', async ({}, testInfo)=>{
    await inputFieldPage.clearInceptionField();
    await inputFieldPage.clickInceptionButton();
    let fieldValue = await inputFieldPage.getClearedInceptionValue();
    expect(fieldValue).toBe('Field cleared ✓');
    await ScreenshotUtil.captureScreenshot(sharedPage, testInfo);
});

test('Check if field is disabled', async ()=>{
    await expect(inputFieldPage.disabledInputField).toBeDisabled();
});

test('Check if field is readonly', async ()=>{
    await expect(inputFieldPage.readOnlyInputField).toHaveAttribute('readonly');
});

});

