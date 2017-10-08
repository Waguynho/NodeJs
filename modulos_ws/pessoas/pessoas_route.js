
var express = require('express')
var router = express.Router()

router.use(function infRoute(req, res, next) {

  next()
})

var pessoa_service = require('./pessoa_service')

router.get('/pessoas', async (req, res) => {

  try {

    let data = await pessoa_service.GetPersons();

    res.status(200).json(data);

  } catch (e) {

    res.status(400).json(e.message);
  }
});

router.get('/pessoas/:id', async (req, res) => {

  try {

    let result = await pessoa_service.FindPerson(req.params.id);

    await res.status(200).json(result);

  } catch (e) {

    res.status(400).json(e.message);
  }

})

router.post('/pessoas', async (req, res, next) => {

  try {

    let response = await pessoa_service.CreatePerson(req.body, next);

    res.status(201).json(response);

  } catch (e) {

    res.status(400).json(e.message);
  }

})

router.put('/pessoas', async (req, res) => {
 

  try {

    let resposta = await pessoa_service.UpdatePessoa(req.body);

    res.status(204).json(resposta);

  } catch (e) {

    res.status(400).json(e.message);
  }
})

router.delete('/pessoas/:id', async (req, res, next) => {

  try {

    await pessoa_service.DeletePerson(req.params.id, function (erro) {

      if (erro) {

        res.status(400).json(erro);

      } else {

        res.status(204).json();
      }

    });

  } catch (e) {

    res.status(400).json(e.message);
  }

})

module.exports = router;
