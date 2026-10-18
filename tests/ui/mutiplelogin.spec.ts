import { test, expect } from "../../fixtures/multi-auth-fixtures";
import { LoggerUtil } from "../../utils/LoggerUtil";
import { ScreenshotUtil } from "../../utils/ScreenshotUtil";


test('Login as Admin and verify title', async({adminPage}, testInfo)=>{

    await adminPage.goto('web/index.php/dashboard/index');
    await expect(adminPage.getByRole('link',{ name: 'Admin'})).toBeVisible();
    await LoggerUtil.info('Admin menu displayed');
    await ScreenshotUtil.captureScreenshot(adminPage, testInfo, testInfo.title);
});

test('Login as customer and verify title', async({customerPage}, testInfo)=>{
    await customerPage.goto('web/index.php/dashboard/index');
    await expect(customerPage.getByRole('link',{ name: 'My Info'})).toBeVisible();
    await LoggerUtil.info('My Info menu displayed');
    await ScreenshotUtil.captureScreenshot(customerPage, testInfo, testInfo.title);
});