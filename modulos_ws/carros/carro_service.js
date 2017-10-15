
const help_db = require('./carro_schema');
const Carro = help_db.Carro;

module.exports.GetCarros = async () => {

    let result = await Carro.find({}).populate({ path: 'dono', select: 'nome idade' }).exec();

    return result;
}

module.exports.FindCarro = async (id) => {

    let result = await Carro.findById(id).populate({ path: 'dono', select: 'nome login' }).exec();;

    return result;
}

module.exports.FindByDono = async (id_dono) => {

    let result = await Carro.find({ dono: id_dono }).populate({ path: 'dono', select: 'nome idade' }).exec();

    return result;
}

module.exports.CreateCarro = async (carro) => {

    let newCar = new Carro();
    newCar.nome = carro.nome;
    newCar.marca = carro.marca;
    newCar.max_velo = carro.max_velo;
    newCar.dono = carro.dono;
    return newCar.save();
}

module.exports.UpdateCar = async (carro) => {

    let result = await Carro.findOneAndUpdate({ _id: carro._id }, carro);

    return result;
}

module.exports.DeleteCar = async (id) => {

    let result = Carro.deleteOne({ _id: id });

    return result;
}

