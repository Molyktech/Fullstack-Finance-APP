
import { getEnv } from "../common/utils/get-env";

const appConfig =  () => ({
    NODE_ENV: getEnv('NODE_ENV', 'development'),
    PORT: getEnv('PORT', '8080'),
    APP_ORIGIN: getEnv('APP_ORIGIN', 'http://localhost:3000'),  
    BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
    MONGODB_URI: getEnv('MONGODB_URI', 'mongodb://localhost:27017/mo_bank'),
    JWT:{
        SECRET: getEnv('JWT_SECRET'),
       EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '1h'),
        REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
        REFRESH_EXPIRES_IN: getEnv('JWT_REFRESH_EXPIRES_IN', '30d'),
    },
    // DATABASE: {
    //     HOST: getEnv('DATABASE_HOST', 'localhost'),
    //     PORT: getEnv('DATABASE_PORT', '5432'),
    //     USER: getEnv('DATABASE_USER', 'postgres'),
    //     PASSWORD: getEnv('DATABASE_PASSWORD', 'password'),
    //     NAME: getEnv('DATABASE_NAME', 'finance_db'),
    // },
})
export const config = appConfig();