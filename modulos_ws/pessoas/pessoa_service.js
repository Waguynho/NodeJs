
var help_db = require('../db_help')

var nome_colecao = 'Pessoas';

function GetPessoas(callback){

  help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

         var collection = db.collection(nome_colecao);

          collection.find({}).toArray(function(err, docs) {

             console.log("Achou Pessoas");

             callback(docs);

             db.close();
        });
     });
}

function FindPessoa(id, callback){

    help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

           var collection = db.collection(nome_colecao);

           console.log("Pessoa por ID "+id);

           collection.findOne({_id: help_db.MongoId.createFromHexString(id)  }, {fields:null/*Trás todos campos*/} ,function(error, docs) {

                  callback(docs);

                  db.close();

          });
    });
};

function CreatePessoa(pessoa, callback){

    help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

          var collection = db.collection(nome_colecao);

           collection.insertOne(pessoa,function(error, resp) {

                  console.log(resp);

                  callback(resp);

                  db.close();

          });
    });
};

function UpdatePessoa(pessoa, callback){

    help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

           var collection = db.collection(nome_colecao);

           console.log("Atualiza pessoa por ID "+pessoa._id);

           collection.updateOne({_id: help_db.MongoId.createFromHexString(pessoa._id) }, {$set: {nome: pessoa.nome, idade: pessoa.idade}},
              { upsert: false  } ,function(error, docs) {

                  callback(docs);

                  db.close();
          });
    });
};

function DeletePessoa(id, callback){

    help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

           var collection = db.collection(nome_colecao);

           console.log("Deletando pessoa com ID: "+id);

           collection.deleteOne({_id: help_db.MongoId.createFromHexString(id)  },function(error, resp) {

                  callback(resp.deletedCount);

                  db.close();

          });
    });
};

module.exports =  {
	GetPessoas: GetPessoas,
  FindPessoa: FindPessoa,
  CreatePessoa: CreatePessoa,
  UpdatePessoa: UpdatePessoa,
  DeletePessoa: DeletePessoa
}
