import {test as setup, expect} from '@playwright/test';
import { OpenSourceLoginPage } from '../../pages/ui/OpenSourceLoginPage';
import { currentConfig } from '../../config/environments.config';
import {LoggerUtil} from '../../utils/LoggerUtil';

setup('Login as Admin', async({page})=>{
    let openSourceLoginPage = new OpenSourceLoginPage(page);
    await page.goto('/');
    await LoggerUtil.info('Environment: '+ process.env.Env);
    await LoggerUtil.info('Admin User Name: '+ currentConfig.adminUser);
    await openSourceLoginPage.enterUserName(currentConfig.adminUser);
    await openSourceLoginPage.enterPassword(currentConfig.adminPwd || 'admin123');
    await openSourceLoginPage.clickOnLoginButton();
    await expect(page.getByRole('heading', {name : 'Dashboard'})).toBeVisible();
    await page.context().storageState({path: './.auth/admin.json'});
});