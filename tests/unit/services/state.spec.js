const { save, load, loadReadStream } = require('../../../src/services/state')

describe('Write and Read a json file', () => {
    it('should write a json file and read', () => {
        const data = {test: 'test'}
        
        save(data, 'test')

        const jsonReaded = load('test')

        expect(jsonReaded).not.toBeNull()

        expect(jsonReaded).toEqual(data)
    })
})