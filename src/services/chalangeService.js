const api = require('../services/api')
const state = require('../services/state')
const { getDecodePhrase } = require('../services/utils')
const cryptoService = require('../services/cryptoService')
var FormData = require('form-data');
require('dotenv/config');

getGenerateData = async (req, res) => {
    const response = await api.get(`/generate-data?token=${process.env.API_TOKEN}`)

    return response
}

saveAnswerInFile = (data) => {
    state.save(response.data, 'answer')
}

loadAnswerFromFile = () => {
    state.load('answer')
}


decipherAndSaveInFile = async () => {
    const data = loadAnswerFromFile()
    
    const {cifrado, numero_casas} = data

    const decifrado = await getDecodePhrase(cifrado, numero_casas)
    const resumo_criptografico = await cryptoService.encrypt(decifrado)

    data.decifrado = decifrado  
    data.resumo_criptografico = resumo_criptografico

    state.save(data, 'answer')
}

loadAnswerAndSendChalange = async () => {
    const file = await state.loadReadStream('answer')
    const formData = new FormData()
    
    formData.append('file', file)
    formData.append('name', "answer")

    const r = await api.post(`/submit-solution?token=${process.env.API_TOKEN}`,
        { data: formData }
    )
    
    return r
}

exports.createAnswer = async (req, res) => {
    const response = await getGenerateData()

    saveAnswerInFile(response.data)
    await decipherAndSaveInFile()    

    response = await loadAnswerAndSendChalange()
    
    res.json(response.data)
}