var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const mid = require('./modulos_ws/Utils/midwares');



app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));

var carros_route = require('./modulos_ws/carros/carros_route')
var pessoas_route = require('./modulos_ws/pessoas/pessoas_route')

app.use(mid.timeLog)//midware personalizdo global
app.use(bodyParser.json())

app.use('/api', carros_route);
app.use('/api', pessoas_route);



app.get('/', function (req, res) {

  res.status(200).json({ saudacao: "Olá Wagner dos Santos" });

})

app.use(function (err, req, res, next) {
  console.log("problema: "+err.message);
  res.status(500).send('algo quebrou na aplicação: ' + err.message)
})

app.use(function (req, res, next) {

  res.status(404).send("Desculpe, página não encontrada!");
})


var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Servidor escutando na porta: ' + port);
})



