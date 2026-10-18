import { test, expect } from '@playwright/test';
test('launch', async ({page})=>{
  await page.goto('file:///C:/javapractice/popup.html');
  const alertBoxLocator = page.locator('fieldset legend');
  await expect(alertBoxLocator).toHaveText('Alert Box');

  const alertTextLocator = page.locator('fieldset p');
  await expect(alertTextLocator).toHaveText('Click the button to display an alert box.');

  page.on('dialog', async dialog=>{
    console.log(`Dialog message text: ${dialog.message()}`);
    await dialog.accept();
  });
  await page.getByRole('button', {name: 'Click on me'}).click();

});