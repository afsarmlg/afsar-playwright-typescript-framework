import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({path: path.resolve(__dirname,'./.env')});

export const environments = {
    dev: {
        baseUrl: "https://herokuapp.com",
        adminUser: process.env.ADMIN_USERNAME || 'adminusername',
        adminPwd: process.env.ADMIN_PASSWORD,
        customerUser: process.env.CUSTOMER_USERNAME || 'customerusername',
        customerPwd: process.env.CUSTOMER_PASSWORD
    },
    qa: {
        baseUrl: process.env.QA_URL,
        adminUser: process.env.ADMIN_USERNAME || 'adminusername',
        adminPwd: process.env.ADMIN_PASSWORD,
        customerUser: process.env.CUSTOMER_USERNAME || 'customerusername',
        customerPwd: process.env.CUSTOMER_PASSWORD
    },
    uat: {
        baseUrl: "https://herokuapp.com",
        adminUser: "dev_admin_user",
        adminPwd: "dev_password",
        // Kept for structural alignment across blocks
        customerUser: "dev_customer_user",
        customerPwd: "dev_password" 
    }
};

const targetEnvironment = (process.env.ENV || 'qa') as keyof typeof environments;
export const currentConfig = environments[targetEnvironment];