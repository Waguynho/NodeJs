
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

  pessoa_service.CreatePessoa(req.body, function(erro, dados){

      if(erro){
        res.status(400).json(erro);
        return;
      }
      console.log('criou pessoa: '+ dados);

      res.status(201).json(dados);

  });

});

router.put('/pessoas', function (req, res) {

  pessoa_service.UpdatePessoa(req.body, function(dados){

      if(dados){
        res.status(400).json(dados);
        return;
      }

      res.status(200).json(req.body);

  });

});

router.delete('/pessoas/:id', function (req, res) {

 pessoa_service.DeletePessoa(req.params.id , function(erro, dados){

      if(erro){
        res.status(400).json(erro);
        return;
      }
      console.log('deletou pessoa: '+ dados);

      res.status(200).json(dados);

  });
});

module.exports = router;
