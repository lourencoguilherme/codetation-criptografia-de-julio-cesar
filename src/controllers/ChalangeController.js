const chalangeService = require('../services/chalangeService')


exports.index = async (req, res) => {
    chalangeService.createAndSendAnswer(req, res)
}