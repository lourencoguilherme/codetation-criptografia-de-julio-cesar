const fs = require('fs');
require('dotenv/config');

const contentFilePath = './src/states/';

const save = (content, fileNameWithoutExtencion) => {
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(`${contentFilePath}${fileNameWithoutExtencion}.json`, contentString)
}

const load = (fileNameWithoutExtencion) => {
    const fileBuffer = fs.readFileSync(`${contentFilePath}${fileNameWithoutExtencion}.json`, 'utf-8')
    const contentJson = JSON.parse(fileBuffer)
    return contentJson
}

const loadReadStream = async (fileNameWithoutExtencion) => {
    const fileStream = fs.createReadStream(`${contentFilePath}${fileNameWithoutExtencion}.json`, 'utf-8')
    return fileStream
}

module.exports = {
    save,
    load,
    loadReadStream
}