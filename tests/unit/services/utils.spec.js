const { getDecodePhrase } = require('../../../src/services/utils')


describe('Decode the phrase using a number of decimal places but not considering the `.` and numbers', () => {
    it('should decode the Phrase', () => {
        const encrypterPhrase = 'd oljhlud udsrvd pduurp vdowrx vreuh r fdfkruur fdqvdgr.1234567890'
        const decypterPhase = 'a ligeira raposa marrom saltou sobre o cachorro cansado.1234567890' 

        const returnDecypterPhase = getDecodePhrase(encrypterPhrase, 3)
        expect(returnDecypterPhase).toHaveLength(encrypterPhrase.length)
        expect(returnDecypterPhase).toEqual(decypterPhase)
        expect(returnDecypterPhase).toContain('.')
        expect(returnDecypterPhase).toContain('1')

    })
})