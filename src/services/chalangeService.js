const api = require('../services/api')
const state = require('../services/state')
const { getDecodePhrase } = require('../services/utils')
const cryptoService = require('../services/cryptoService')
const FormData = require('form-data');
const TooManyRequestsError = require('../errors/TooManyRequestsError')
require('dotenv/config');


function saveDataInFile(data) {
    state.save(data, 'answer')
}

function loadJsonDataFromFile() {
    return state.load('answer')
}

function loadFileDataFromFile() {
    return state.loadReadStream('answer')
}

async function getGenerateDataAndSaveInFile() {
    const response = await api.get(`/generate-data?token=${process.env.API_TOKEN}`)
    saveDataInFile(response.data) 
}

async function loadAnswerFileAndDecipher() {
    const data = loadJsonDataFromFile()
    
    const {cifrado, numero_casas} = data

    const decifrado = await getDecodePhrase(cifrado, numero_casas)
    const resumo_criptografico = await cryptoService.encrypt(decifrado)

    data.decifrado = decifrado  
    data.resumo_criptografico = resumo_criptografico

    saveDataInFile(data)
}

async function sendAnswerChalange() {
    const answer = new FormData();
    answer.append('answer', loadFileDataFromFile());

    const response = await api.post(
        `/submit-solution?token=${process.env.API_TOKEN}`, 
        answer,
        { headers: answer.getHeaders(), },
    );

    return response
}

exports.createAndSendAnswer = async () => {
    try{
        await getGenerateDataAndSaveInFile()
        
        await loadAnswerFileAndDecipher();
        const response = await sendAnswerChalange()        
        const { score } = response.data
        const { status } = response
        
        const data = {
            status,
            name: 'OK',
            score,
            message: 'Upload successful!',            
        }

        return data
    } catch(err) {
        if(err && err.response && err.response.data && err.response.data.code) {            
            
            throw new TooManyRequestsError(
                err.response.data.code, 
                err.response.data.error,
                err.response.data.error, 
                err.response.data.message   
            );
        } else {
            throw new ApplicationError ()
        }
    }
    
    
   
    
}