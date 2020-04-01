'use strict';

exports.getDecodePhrase = (phrase, number) => {

    const num = number < 0 ? 26 : number
    let output = ''

    for (let i = 0; i < phrase.length; i++) {
        const code = phrase.charCodeAt(i)
        let c = ''
        if (code >= 65 && code <= 90) {
            c = String.fromCharCode((code - num) % 26)
        } else if (code >= 97 && code <= 122) {
            if (code - num < 97) {
                c = String.fromCharCode(code - num + 122 - 97 + 1)
            } else {
                c = String.fromCharCode(code - num)
            }
        } else {
            if (code === 32) {
                c = ' '
            } else if (code === 58 || code === 46 || (code >= 48 && code <= 57)) {
                c = String.fromCharCode(code)
            }
        }
        output += c
    }
  return output
}