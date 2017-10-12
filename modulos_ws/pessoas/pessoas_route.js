
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

  let response = await pessoa_service.CreatePerson(req.body, next)
    .then(data => {

      res.status(200).json(data);

    }).catch(err => {

      res.status(500).json(err.message);

    })
})

router.put('/pessoas', async (req, res) => {


  try {

    let resposta = await pessoa_service.UpdatePessoa(req.body, async (erro, data) => {

      if (erro) {

        res.status(400).json(erro);

      } else {
        res.status(200).json(data);
      }
    });

  } catch (e) {

    res.status(400).json(e.message);
  }
})

router.delete('/pessoas/:id', async (req, res, next) => {  

   let response = await pessoa_service.DeletePerson(req.params.id)

    .then(data => {

      res.status(200).json(data);

    }).catch(err => {

      res.status(500).json(err.message);
    })    
})

module.exports = router;
