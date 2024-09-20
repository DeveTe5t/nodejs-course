# Dev
1. Clone the env.template file to .env
```
PORT=3000

PUBLIC_PATH=public
```
2. Create folder keys inside project and into execute the command: is optional for use file app.http2.ts ```openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt```

3. Execute the command ```npm install```
4. Execute the command ```npm run dev```