var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://wagner:789789@ds139288.mlab.com:39288/carros_db';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  
  findDocuments(db, ExibeResultado);

  db.close();
});

var findDocuments = function(db, callback) {
	  // Get the documents collection
	  var collection = db.collection('Carros');
	  // Find some documents
	  collection.find({}).toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Achou os seguintes registros");
	    //console.log(docs)
	    callback(docs);
	  });
	};
	
	
	
	function ExibeResultado(documentos){
		
		for (pos in documentos){
			
			console.log('Carro: '+documentos[pos].nome+' fabricado por: '+documentos[pos].marca+', tem velocidade:'+documentos[pos].max_velo);
			
		}		
		
	}
	
	