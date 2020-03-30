const axios = require('axios');

module.exports = {
    api() {
        return axios.create({
            baseURL: 'https://api.codenation.dev',
        })
    },

    token() {
        return '7d8f9b1af7d8adb32c3afea5fa71debf682fbd3b';
    }

    
}
