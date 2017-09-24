var express = require('express');
var jwt = require('jsonwebtoken')
var config = require('./config.json')

var timeLog = function (req, res, next) {
    console.log('Tempo: ', new Date( Date.now()));
    next()
}

var infRoute = function(options) {
    return function(req, res, next) {
      console.log("Rota: "+options.nameRoute)
      next()
    }
  }

  var verifyToken = function (req, res, next) {
    console.log('verificando token...')

    let token = req.query.token || req.body.token || req.headers.token

    jwt.verify(token, config.segredo, function (err, decoded) {

        if (err) {

            throw new Error(err);
        }       
    });

    next()
}

module.exports = {
    timeLog: timeLog,
    infRoute: infRoute,
    verifyToken: verifyToken    
}
