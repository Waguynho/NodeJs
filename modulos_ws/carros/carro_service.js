
var help_db = require('./carro_schema')


var Carro = help_db.Carro;

function GetCarros(callback) {

    Carro.find(function (err, carros) {
        if (err) {
            return console.log(err)
        }
        callback(carros)
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
    var newCar = new Carro();

    newCar.nome = carro.nome;
    newCar.marca = carro.marca;
    newCar.max_velo = carro.max_velo;
    newCar.dono = carro.dono;

    newCar.save(function (err, carro) {
        if (err) {
            callback(err, null);
            return
        }
        console.log("Criou carro!");

        callback(false, newCar._id);
    })
}


function UpdateCar(carro, callback) {

    Carro.findOneAndUpdate({ _id: carro._id }, carro, function (err, response) {

        if (err) {
            throw new Error(err);
        }

        callback(response);

    })
}

function DeleteCar(id, callback) {

    Carro.deleteOne({ _id: id }, function (err, response) {

        if (err) {
            throw new Error(err);
        }

        callback(response);
    });
}

module.exports = {
    GetCarros: GetCarros,
    FindCarro: FindCarro,
    DeleteCar: DeleteCar,
    CreateCarro: CreateCarro,
    UpdateCar: UpdateCar,
    FindByDono: FindByDono
}
