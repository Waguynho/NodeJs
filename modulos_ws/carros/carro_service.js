
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// Connection URL
var url = 'mongodb://wagner:789789@ds139288.mlab.com:39288/carros_db';

var nome_colecao = 'Carros';

function GetCarros(callback){

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
     var collection = db.collection(nome_colecao);
     console.log("Conectou ao servidor remoto");
        collection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);

           console.log("Achou Carros");

           callback(docs);

           db.close();
      });
   });
}

module.exports =  {
	GetCarros:GetCarros
}
