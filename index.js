var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var express = require('express');
var app = express();

// Connection URL
var url = 'mongodb://wagner:789789@ds139288.mlab.com:39288/carros_db';

app.get('/carros', function (req, res) {

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Conectou ao servidor remoto");

     findDocuments(db, ExibeResultado, res);


  });

});

app.listen(3000, function () {
  console.log('Servidor escutando na porta: 3000!');
});

var findDocuments = function(db, callback, res) {
	  // Get the documents collection
	  var collection = db.collection('Carros');
	  // Find some documents
	    collection.find({}).toArray(function(err, docs) {
	       assert.equal(err, null);
	        console.log("Achou os seguintes registros");

          res.json(docs);
          //res.send();

	         callback(docs);
           db.close();

	  });
};

  function ExibeResultado(documentos){
	 documentos.forEach(function(item) {
	  	console.log('Carro: '+item.nome + ' fabricado por: '+item.marca+', tem velocidade:'+item.max_velo);
	});
}
