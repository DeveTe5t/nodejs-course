import 'dotenv/config';
import * as env from 'env-var';

// with native node execute:
// node --env-file .env dist/app.js 
// but before execute: npx tsc for generate app.js in dist folder
export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    PROD: env.get('PROD').required().asBool(),
}