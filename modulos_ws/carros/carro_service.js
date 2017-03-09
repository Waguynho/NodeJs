
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

function FindCarro(id, callback){

    help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

           var collection = db.collection(nome_colecao);

           console.log("Carro por ID "+id);

           collection.findOne({_id: help_db.MongoId.createFromHexString(id)  }, {fields:null/*Trás todos campos*/} ,function(error, docs) {

                  callback(docs);

                  db.close();

          });
    });
};

function FindByDono(id_dono, callback){

    help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

           var collection = db.collection(nome_colecao);

           help_db.assert.equal(null, err);

           var collection = db.collection(nome_colecao);

           console.log("ID Dono"+id_dono);

           collection.find({dono: id_dono}).toArray(function(err, docs) {
               help_db.assert.equal(err, null);

                callback(docs);

                db.close();
         });
    });
};

function CreateCarro(carro, callback){

    help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

           var collection = db.collection(nome_colecao);

           help_db.assert.equal(null, err);

           var collection = db.collection(nome_colecao);

           collection.insertOne(carro,function(error, resp) {

                  console.log(resp);

                  callback(resp);

                  db.close();

          });
    });
};


function UpdateCarro(carro, callback){

    help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

           var collection = db.collection(nome_colecao);

           help_db.assert.equal(null, err);

           var collection = db.collection(nome_colecao);

           console.log("Atualiza por ID "+carro._id);

           collection.updateOne({_id: help_db.MongoId.createFromHexString(carro._id) }, {$set: {nome: carro.nome, max_velo: carro.max_velo, marca: carro.marca, dono: carro.dono}},
              { upsert: false  } ,function(error, docs) {

                  callback(docs);

                  db.close();

          });
    });
};

function DeleteCarro(id, callback){

    help_db.MongoClient.connect(help_db.URLDB, function(err, db) {

           var collection = db.collection(nome_colecao);

           help_db.assert.equal(null, err);

           var collection = db.collection(nome_colecao);

           console.log("Deletando carro com ID: "+id);

           collection.deleteOne({_id: help_db.MongoId.createFromHexString(id)  },function(error, resp) {

                  callback(resp.deletedCount);

                  db.close();

          });
    });
};


module.exports =  {
	GetCarros:GetCarros,
  FindCarro: FindCarro,
  DeleteCarro: DeleteCarro,
  CreateCarro: CreateCarro,
  UpdateCarro: UpdateCarro,
  FindByDono: FindByDono
}
