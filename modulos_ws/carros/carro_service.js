
var help_db = require('./carro_schema')

var Carro = help_db.Carro;

function GetCarros(callback) {
    Carro.find(function (err, carros) {
        if (err) {
            return console.log(err);
        }

        console.log("api/carros => Achou carros");
        console.log(carros);
        callback(carros);
    })
}

function FindCarro(id, callback) {

    Carro.findById(id, function (erro, carro) {
        if (erro) {
            callback(erro, null);
        }

        callback(null, carro);

    })
}

function FindByDono(id_dono, callback) {

    console.log('procurando por dono: %s', id_dono);
    Carro.find({ dono: id_dono }, function (erro, carro) {
        if (erro) {
            callback(erro, null);
        }

        callback(null, carro);
    })
}

function CreateCarro(carro, callback) {
    var carroNovo = new Carro();

    carroNovo.nome = carro.nome;
    carroNovo.marca = carro.marca;
    carroNovo.max_velo = carro.max_velo;
    carroNovo.dono = carro.dono;

    carroNovo.save(function (err, carro) {
        if (err) {
            callback(err, null);
            return
        }
        console.log("Criou carro!");

        callback(false, carroNovo);
    })
}


function UpdateCarro(carro, callback) {

    help_db.MongoClient.connect(help_db.URLDB, function (err, db) {

        var collection = db.collection(nome_colecao);

        help_db.assert.equal(null, err);

        var collection = db.collection(nome_colecao);

        console.log("Atualiza por ID " + carro._id);

        collection.updateOne({ _id: help_db.MongoId.createFromHexString(carro._id) }, { $set: { nome: carro.nome, max_velo: carro.max_velo, marca: carro.marca, dono: carro.dono } },
            { upsert: false }, function (error, docs) {

                callback(docs);

                db.close();

            });
    });
};

function DeleteCarro(id, callback) {

    help_db.MongoClient.connect(help_db.URLDB, function (err, db) {

        var collection = db.collection(nome_colecao);

        help_db.assert.equal(null, err);

        var collection = db.collection(nome_colecao);

        console.log("Deletando carro com ID: " + id);

        collection.deleteOne({ _id: help_db.MongoId.createFromHexString(id) }, function (error, resp) {

            callback(resp.deletedCount);

            db.close();

        });
    });
};


module.exports = {
    GetCarros: GetCarros,
    FindCarro: FindCarro,
    DeleteCarro: DeleteCarro,
    CreateCarro: CreateCarro,
    UpdateCarro: UpdateCarro,
    FindByDono: FindByDono
}
