var express = require('express')
var app = express()

var carros_route = require('./modulos_ws/carros/carros_route')

app.use('/api',carros_route)

app.listen(3000, function () {
    console.log('Servidor escutando na porta: 3000!');
});

app.get('/', function (req, res) {

      res.status(200).json({saudacao:"Olá Wagner dos Santos"});

});
