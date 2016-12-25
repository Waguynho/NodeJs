var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/EscolaDb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  
  findDocuments(db, ExibeResultado);

  db.close();
});

var findDocuments = function(db, callback) {
	  // Get the documents collection
	  var collection = db.collection('Estudantes');
	  // Find some documents
	  collection.find({}).toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Achou os seguintes registros");
	    console.log(docs)
	    callback(docs);
	  });
	};
	
	
	
	function ExibeResultado(documentos){
		
		for (pos in documentos){
			
			console.log('Pessoa: '+documentos[pos].nome+' tem idade: '+documentos[pos].idade);
			
		}
		
		
	}
	
	