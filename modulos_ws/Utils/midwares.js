var express = require('express');

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

module.exports = {
    timeLog: timeLog,
    infRoute: infRoute    
}
