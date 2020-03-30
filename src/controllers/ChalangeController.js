const { getChalange } = require('../services/challenge');
const { api, token } = require('../services/api');
const sha1 = require('js-sha1');

const crypto = require('crypto');
var fs = require('fs');


module.exports = {
    
    async index(request, response) {
                
        const data = await getChalange();

        const chalange = await api().get('/v1/challenge/dev-ps/generate-data?token=7d8f9b1af7d8adb32c3afea5fa71debf682fbd3b');

        // console.log(chalange.data);

        const contentFilePath = './answer.json';
        const contentString = JSON.stringify(chalange);
        fs.writeFileSync(contentFilePath, contentString);

        return response
            .json(chalange);
    },

    

}
