const api = require('../services/api')
const state = require('../services/state')
const { getDecodePhrase } = require('../services/utils')
const cryptoService = require('../services/cryptoService')
const FormData = require('form-data');
const request = require('request');
const axios = require('axios')
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

exports.createAndSendAnswer = async (req, res) => {
    try{
        await getGenerateDataAndSaveInFile()
        
        await loadAnswerFileAndDecipher();
        const response = await sendAnswerChalange()
   
        res.json(response.data)
    } catch(err) {
        if(err && err.response && err.response.data && err.response.data.code) {
            res.status(err.response.status)
            .json({code: err.response.data.code, error: err.response.data.error, message: err.response.data.message  })
        } else {
            console.log(err)
            res.status(500).json({status: 500, message: 'Uninspected server error 500', name: 'Internal Server Error'})
        }
    }
    
    
   
    
}