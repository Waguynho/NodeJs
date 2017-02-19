
var express = require('express')
var router = express.Router()

router.use(function timeLog (req, res, next) {
  console.log('Rota de Carro')
  next()
})

var carro_service = require('./carro_service')

router.get('/carros', function (req, res) {

if (req.query.dono != null) {
      carro_service.FindByDono(req.query.dono, function(dados){

          res.status(200).json(dados);

      });
    return;
}

  carro_service.GetCarros(function(dados){

      res.status(200).json(dados);

  });

});

router.get('/carros/:id', function (req, res) {

  carro_service.FindCarro(req.params.id, function(dados){

      res.status(200).json(dados);

  });
});

router.post('/carros', function (req, res) {

  carro_service.CreateCarro(req.body, function(dados){

      console.log('criou: '+ dados);

      res.status(201).json(dados);

  });

});

router.put('/carros', function (req, res) {

  carro_service.UpdateCarro(req.body, function(dados){

      console.log('atualou: '+ dados);

      res.status(200).json(dados);

  });

});

router.delete('/carros/:id', function (req, res) {

  carro_service.DeleteCarro(req.params.id, function(dados){

      console.log('Deletou: '+dados);

      res.status(204).send();

  });
});

module.exports = router
