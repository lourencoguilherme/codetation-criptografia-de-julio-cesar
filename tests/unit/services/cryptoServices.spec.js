const { encrypt } = require('../../../src/services/cryptoService')

describe('Service to encrypt worlds', () => {
    it('should encrypt a word', ()=> {
        const word = 'test of cryptographic'
        
        const wordEncrypted =  encrypt(word)

        expect(wordEncrypted).not.toEqual(word)
    })
})