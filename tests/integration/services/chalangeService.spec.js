const chalangeService = require('../../../src/services/chalangeService')
describe('Make a chalange Request decipher the chalange and send the correct answer', ()=> {
    
    it('should request chalange and send decipher chalange with a score equal 100 or reciver error code 429', async ()=> {
        try {
            const response = await chalangeService.createAndSendAnswer()
            expect(response.score).toEqual(100);
        } catch (error) {
            expect(parseInt(error.status)).toEqual(429);   
        }
    })

})