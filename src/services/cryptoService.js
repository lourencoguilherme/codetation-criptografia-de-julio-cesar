'use strict';
const crypto = require('crypto')

require('dotenv/config')

const secretAlgorithm = process.env.API_CRYPTO_SECRET_ALGORITHM
const secretPassword = process.env.API_CRYPTO_SECRET_ALGORITHM


const encrypt = async (textDeciphered) => {
    const encrypted = crypto
    .createHash('sha1')
    .update(textDeciphered)
    .digest('hex')
    return encrypted
}

module.exports = {
    encrypt
}