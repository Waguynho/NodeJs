var express = require('express');
var app = express();
var carro_service = require('./modulos_ws/carros/carro_service');



app.listen(3000, function () {
    console.log('Servidor escutando na porta: 3000!');
});

app.get('/carros', function (req, res) {

  carro_service.GetCarros(function(dados){

      res.status(200).json(dados);

  });

});
