# Project NOC

The goal is to create a series of tasks using Clean Architecture with TypeScript.

# dev
1. Clone the env.template file to .env
2. Set up the environment variables
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
3. Execute the command ```npm install```
4. Raise the databases with the command
    ```
    docker compose up -d
    ```
5. Execute the command
    ```
    npx prisma migrate dev
    ```
6. Execute ```npm run dev```

## Get Gmail Key
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)