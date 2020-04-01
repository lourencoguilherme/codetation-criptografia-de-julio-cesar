'use strict';
const crypto = require('crypto')

exports.encrypt = async (textDeciphered) => {
    const encrypted = crypto
    .createHash('sha1')
    .update(textDeciphered)
    .digest('hex')
    return encrypted
}
