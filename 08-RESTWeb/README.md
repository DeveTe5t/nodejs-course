# Dev
1. Clone the env.template file to .env
```
PORT=3000

PUBLIC_PATH=public
```
2. Create folder keys inside project and into execute the command: is optional for use file app.http2.ts ```openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt```

3. Execute the command ```npm install```
4. Raise the databases with the command
    ```
    docker compose up -d
    ```
5. Execute the command
    ```
    npx prisma migrate dev
    ```
6. Execute the command ```npm run dev```