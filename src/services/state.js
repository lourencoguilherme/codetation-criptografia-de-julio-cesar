const fs = require('fs');
require('dotenv/config');

const contentFilePath = process.env.DATABASE_LOCATION;

const save = (content, fileNameWithoutExtencion) => {
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(`${contentFilePath}${fileNameWithoutExtencion}.json`, contentString)
}

const load = (fileNameWithoutExtencion) => {
    const fileBuffer = fs.readFileSync(`${contentFilePath}${fileNameWithoutExtencion}.json`, 'utf-8')
    const contentJson = JSON.parse(fileBuffer)
    return contentJson
}

const loadReadStream = (fileNameWithoutExtencion) => {
    return  fs.createReadStream(`${contentFilePath}${fileNameWithoutExtencion}.json`)
}

module.exports = {
    save,
    load,
    loadReadStream
}