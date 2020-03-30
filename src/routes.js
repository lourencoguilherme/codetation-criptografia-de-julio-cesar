const express = require('express');

const routes = express.Router();

const ChalangeControler = require('./controllers/ChalangeController');

routes.get('/chalanges', ChalangeControler.index);

module.exports = routes;