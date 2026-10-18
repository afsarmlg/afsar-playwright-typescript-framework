import { test, APIResponse, TestInfo } from '@playwright/test';

export class LoggerUtil {

    static async info(message: string): Promise<void> {
        await test.step(`INFO: ${message}`, async () => { });
    }

    /**
     * Logs API Request details with payload attached natively to the step
     */
    static async apiRequest(method: string, url: string, testInfo: TestInfo, payload?: any): Promise<void> {
        await test.step(`API REQ: [${method.toUpperCase()}] URL: ${url}`, async () => {
            if (payload) {
                // This attaches the text directly underneath this specific step block
                await testInfo.attach('Request Payload', {
                    body: JSON.stringify(payload, null, 2),
                    contentType: 'text/plain'
                });
            }
        });
    }

    /**
     * Logs API Response details with body text attached natively to the step
     */
    static async apiResponse(response: APIResponse): Promise<void> {
        const status = response.status();
        const url = response.url();
        let bodyText = '';

        try {
            const json = await response.json();
            bodyText = JSON.stringify(json, null, 2);
        } catch {
            bodyText = await response.text();
        }

        // 1. MUST use actual backticks here: ` text `
        await test.step(` API RES: [${status}] URL: ${url}`, async () => {

            // 2. Target the active test runner metadata block directly
            await test.info().attach('Response Body', {
                body: bodyText,
                contentType: 'application/json'
            });

        });
    }
}