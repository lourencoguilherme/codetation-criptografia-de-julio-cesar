const axios = require('axios');
require('dotenv/config');

const api = axios.create({
    baseURL: process.env.API_HOST,
    }
)

api.interceptors.request.use((config) => {
    config.url += `?token=${process.env.API_TOKEN}`
    return config
})

api.interceptors.response.use((config) => {
    return config
})

module.exports = api
