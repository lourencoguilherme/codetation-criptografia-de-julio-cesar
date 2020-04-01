const chalangeService = require('../services/chalangeService')
const TooManyRequestsError = require('../errors/TooManyRequestsError')
const ApplicationError = require('../errors/ApplicationError')

exports.index = async (req, res) => {
    try {
        const data = await chalangeService.createAndSendAnswer()
        res.status(data.status)
            .json(data)  
    } catch (error) {
        if (error instanceof TooManyRequestsError || error instanceof ApplicationError) {
            res.status(error.status)
            .json(error) 
        } else {
            res.status(500)
            .json(new ApplicationError())  
        }
        
    }
    
}