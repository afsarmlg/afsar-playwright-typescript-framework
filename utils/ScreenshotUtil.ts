import {Page, TestInfo} from '@playwright/test';

export class ScreenshotUtil{
    static async captureScreenshot(page: Page, testInfo:TestInfo, customPrefix?:string){
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth()+1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

        const formattedTimestamp = `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`;
        const dynamicLabel = customPrefix ? `${customPrefix}_${formattedTimestamp}` : formattedTimestamp;

        const screenshotBuffer = await page.screenshot();
        await  testInfo.attach(dynamicLabel, {body: screenshotBuffer, contentType:'image/png',})

    }
}