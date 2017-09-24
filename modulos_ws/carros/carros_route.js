
var express = require('express');
var router = express.Router();
var carro_service = require('./carro_service');
var mid = require('../Utils/midwares');

router.use('/carros', mid.infRoute({nameRoute:"Carros"}))//midware personalizdo local

router.use('/carros', mid.verifyToken) //protejo todas as rotas deste serviço

router.get('/carros', function (req, res) {

  if (req.query.dono != null) {
    carro_service.FindByDono(req.query.dono, function (erro, dados) {

      if (erro) {
        res.status(500).json({ message: erro.message });
        return;
      }

      res.status(200).json(dados);

    });

  } else {

    carro_service.GetCarros(function (dados) {

      res.status(200).json(dados);

    });
  }
})

router.get('/carros/:id',  function (req, res) {

  carro_service.FindCarro(req.params.id, function (erro, dados) {

    if (erro) {
      res.status(500).json({ message: erro.message });
      return;
    }

    res.status(200).json(dados);

  });
})

router.post('/carros', function (req, res) {

  carro_service.CreateCarro(req.body, function (erro, dados) {

    if (erro) {
      res.status(400).json(erro);
      return;
    }

    console.log('criou: ' + dados);

    res.status(201).json(dados);

  });

})

router.put('/carros', function (req, res) {

  carro_service.UpdateCar(req.body, function (dados) {

    res.status(200).json(dados);
    
  });

})

router.delete('/carros/:id', function (req, res) {

  carro_service.DeleteCar(req.params.id, function (dados) {

    res.status(200).json(dados);

  });
})

module.exports = router
