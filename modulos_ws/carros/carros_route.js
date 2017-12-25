
const express = require('express');
const router = express.Router();

const carService = require('./carro_service');
const mid = require('../Utils/midwares');

router.use('/carros', mid.infRoute({ nameRoute: "Carros" }))//midware personalizdo local

router.use('/carros', mid.verifyToken) //protejo todas as rotas deste serviço

router.get('/carros', async (req, res) => {

  try {
    if (req.query.dono != null) {

      let carros = await carService.FindByOwner(req.query.dono);
   

      res.status(200).json(carros);

    } else {

      let carros = await carService.GetCars(req.query.start);

      res.setHeader('Quantity', carros.quantity);

      res.setHeader('Access-Control-Expose-Headers', 'Quantity');

      res.status(200).json(carros);

    }
  } catch (error) {
    res.status(500).json(error.message);
  }
})

router.get('/carros/:id', async (req, res) => {

  try {

    let carro = await carService.FindCar(req.params.id);

    res.status(200).json(carro);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

})

router.post('/carros', async (req, res) => {

  carService.CreateCar(req.body)
    .then(data => {
      res.status(201).json(data);
    }
    ).catch(err => {

      res.status(500).json(err.message);
    })

})

router.put('/carros', async (req, res) => {

  carService.UpdateCar(req.body)
    .then(data => {
      res.status(200).json(data);
    }
    ).catch(err => {

      res.status(500).json(err.message);
    })
})

router.delete('/carros/:id', function (req, res) {

  carService.DeleteCar(req.params.id)
    .then(data => {
      res.status(204).json(data);
    }
    ).catch(err => {

      res.status(500).json(err.message);
    })
})

module.exports = router
