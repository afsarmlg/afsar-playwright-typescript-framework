import {test, expect, request} from '@playwright/test';
import { LoggerUtil } from '../../utils/LoggerUtil';

test.describe('API testing', async()=>{

    test('get all product lists', async ({request}, testInfo)=>{
        const response = await request.get('https://automationexercise.com/api/productsList');
        await expect(response).toBeOK();
        await LoggerUtil.apiResponse(response);
    });


});