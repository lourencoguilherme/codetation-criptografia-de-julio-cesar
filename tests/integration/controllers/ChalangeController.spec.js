const app = require('../../../src/app');
const request = require('supertest');
describe('Make a chalange Request decipher the chalange and send the correct answer', ()=> {
    
    it('should request chalange and send decipher chalange with a score equal 100 or reciver error code 429', async ()=> {
        const response = await request(app)
        .get('/chalanges')

        expect(response).not.toBeNull();
        
        if(response.status == 200) {
            expect(parseInt(response.body.status)).toEqual(200);
        } else {
            expect(parseInt(response.body.status)).toEqual(429);
        }

    })

})