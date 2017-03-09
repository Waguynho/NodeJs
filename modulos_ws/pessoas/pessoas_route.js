
var express = require('express')
var router = express.Router()

router.use(function timeLog (req, res, next) {
  console.log('Rota de Pessoas')
  next()
})

var pessoa_service = require('./pessoa_service')

router.get('/pessoas', function (req, res) {

  pessoa_service.GetPessoas(function(dados){

      res.status(200).json(dados);

  });

});

router.get('/pessoas/:id', function (req, res) {

  pessoa_service.FindPessoa(req.params.id, function(dados){

      res.status(200).json(dados);

  });
});

router.post('/pessoas', function (req, res) {

  pessoa_service.CreatePessoa(req.body, function(dados){

      console.log('criou pessoa: '+ dados);

      res.status(201).json(dados);

  });

});

router.put('/pessoas', function (req, res) {

  pessoa_service.UpdatePessoa(req.body, function(dados){

      console.log('atualizou pessoa: '+ dados);

      res.status(200).json(dados);

  });

});

router.delete('/pessoas/:id', function (req, res) {

  pessoa_service.DeletePessoa(req.params.id, function(dados){

      console.log('Deletou pessoa: '+dados);

      res.status(204).send();

  });
});

module.exports = router;
