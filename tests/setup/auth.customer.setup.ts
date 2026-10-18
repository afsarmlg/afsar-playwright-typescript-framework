import {test as setup, expect} from '@playwright/test';
import { OpenSourceLoginPage } from '../../pages/ui/OpenSourceLoginPage';
import { LoggerUtil } from '../../utils/LoggerUtil';
import { currentConfig } from '../../config/environments.config';


setup('Login as Customer', async({page})=>{
    let openSourceLoginPage = new OpenSourceLoginPage(page);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await LoggerUtil.info('Environment: '+ process.env.Env);
    await LoggerUtil.info('Customer User Name: '+ currentConfig.customerUser);
    await openSourceLoginPage.enterUserName(currentConfig.customerUser);
    await openSourceLoginPage.enterPassword(currentConfig.customerPwd || 'admin123');
    await openSourceLoginPage.clickOnLoginButton();
    await expect(page.getByRole('heading', {name : 'Dashboard'})).toBeVisible();
    await page.context().storageState({path: './.auth/customer.json'});

});
