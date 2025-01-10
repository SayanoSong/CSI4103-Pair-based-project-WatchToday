// Setup for testing express https://dev.to/lukekyl/testing-your-express-js-backend-server-3ae6

const server = require('./app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Test the root path', () => {

    // beforeEach(async () => {
    //     const mod = await import('./');
    //     server = mod.default;
    // })

    // afterAll((done) => {
    //     if(server) {
    //         server.close(done);
    //     }
    // })

    it('Get the root path of the server and return hello world', async () =>{
        const response = await requestWithSupertest.get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello World!');
    })
});
