
var express = require('express')
var router = express.Router()

router.use(function timeLog (req, res, next) {
  console.log('Rota de Carro')
  next()
})

var carro_service = require('./carro_service')

router.get('/carros', function (req, res) {

  carro_service.GetCarros(function(dados){

      res.status(200).json(dados);

  });

});

router.get('/carros/:id', function (req, res) {

      res.status(200).json({carro:"Carro Próprio"});

});

module.exports = router
