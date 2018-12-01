const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mid = require('./modulos_ws/Utils/midwares');

app.use(cors())

app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));

const carros_route = require('./modulos_ws/carros/carros_route')
const pessoas_route = require('./modulos_ws/pessoas/pessoas_route')
const auth = require('./modulos_ws/Utils/auth')

app.use(mid.timeLog)//midware personalizdo global
app.use(bodyParser.json())

app.use('/api', carros_route);
app.use('/api', pessoas_route);
app.use('/api', auth)

app.get('/', function (req, res) {

  res.status(200).json({ saudacao: "Helo Wagner Santos!" });

})

app.use( (err, req, res, next) => {

  console.log("problem is: " + err);

  res.status(500).json({message: err.toString()}); 

})

app.use( (req, res, next) => {

  res.status(404).send("Desculpe, página não encontrada!");
})

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Servidor escutando na porta: ' + port);
})



