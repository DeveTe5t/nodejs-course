import 'dotenv/config';
import { get } from 'env-var';

// with native node execute:
// node --env-file .env dist/app.js 
// but before execute: npx tsc for generate app.js in dist folder
export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').required().default('public').asString(),
}