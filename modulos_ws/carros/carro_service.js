
const help_db = require('./carro_schema');
let ObjectId = require('mongoose').Types.ObjectId; 
const Carro = help_db.Carro;

module.exports.GetCarros = async () => {

  let result = await Carro.find({}).populate({path:'dono', select:'nome idade'}).exec();

  return result;
}

module.exports.FindCarro= async(id) => {

    let result = await Carro.findById(id).populate({path:'dono', select:'nome login'}).exec();;

    return result;
}

module.exports.FindByDono = async (id_dono) => {
    
  let dono_ref = ObjectId.createFromHexString(id_dono);

  console.log(id_dono);

  let result = await  Carro.find({ dono: id_dono}).populate({path:'dono', select:'nome idade'}).exec();

  return result;
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


module.exports.UpdateCar = (carro, callback) => {

    carro.dono = ObjectId(carro.dono);

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

