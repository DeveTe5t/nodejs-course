# Project NOC

The goal is to create a series of tasks using Clean Architecture with TypeScript.

# dev
1. Clone the env.template file to .env
2. Clone the env.test.template file to .env.test
3. Set up the environment variables in .env and .env.test
```
PORT=3000

MAILER_SERVICE=gmail
MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false


MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=


POSTGRES_URL=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASS=
```
4. Execute the command ```npm install```
5. Raise the databases with the command
    ```
    docker compose up -d
    ```
6. Execute the command
    ```
    npx prisma migrate dev
    ```
7. Execute ```npm run dev```

## Get Gmail Key
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)