import { envs } from './envs.plugin';


describe('envs.plugin.ts', () => {

    const originalEnv = process.env;

    beforeEach(() => {
        // Reset env variables
        process.env = { ...originalEnv };
        // Reset node modules
        jest.resetModules();
    });

    test('should return env options', () => {

        // Assert
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: expect.any(String),
            MAILER_SECRET_KEY: expect.any(String),
            PROD: expect.any(Boolean),
            MONGO_URL: expect.any(String),
            MONGO_DB_NAME: expect.any(String),
            MONGO_USER: expect.any(String),
            MONGO_PASS: expect.any(String)
        });
    });

    test('should return error if not found integer PORT', async () => {

        // Arrange
        // jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            // Act
            await import('./envs.plugin');

            // Assert
            expect(true).toBe(false);
        } catch (error) {
            // Assert     
            // "PORT" should be a valid integer: from console.log(error)       
            // Not working            
            // expect(error).toContain('"PORT" should be a valid integer');
            // It Working
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });

    test('should have a MAILER_EMAIL', async () => {

        // beforeEach: without this method not working,
        // bacause the process.env is not reset from last test
        // where process.env.PORT is changed

        // Arrange
        const myEmail = 'myemail-email.com';
        process.env.MAILER_EMAIL = myEmail;

        try {
            // Act
            await import('./envs.plugin');

            // Assert
            expect(true).toBeFalsy();
        } catch (error) {
            // Assert
            expect(`${error}`).toContain('"MAILER_EMAIL" should be a valid email address');
        }
    });
});