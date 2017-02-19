
var help_db = require('../db_help')

var nome_colecao = 'Carros';

function GetCarros(callback){

help_db.MongoClient.connect(help_db.URLDB, function(err, db) {
    help_db.assert.equal(null, err);
     var collection = db.collection(nome_colecao);
     console.log("Conectou ao servidor remoto");
        collection.find({}).toArray(function(err, docs) {
          help_db.assert.equal(err, null);

           console.log("Achou Carros");

           callback(docs);

           db.close();
      });
   });
}

module.exports =  {
	GetCarros:GetCarros
}
