var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));

var carros_route = require('./modulos_ws/carros/carros_route')
var pessoas_route = require('./modulos_ws/pessoas/pessoas_route')

app.use('/api', carros_route);
app.use('/api', pessoas_route);

app.get('/', function (req, res) {

      res.status(200).json({saudacao:"Olá Wagner dos Santos"});

})



app.listen(3000, function () {
    console.log('Servidor escutando na porta: 3000!');
})



