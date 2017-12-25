const helpDb = require('./carro_schema');
const Car = helpDb.Car;

module.exports.GetCars = async (start) => {	

	let result = await Car.find({}).skip(parseInt(start)).limit(8).populate({ path: "dono", select: 'nome idade' }).exec();
	
	result.quantity = await Car.find({}).count();
	
	return result;
};

module.exports.FindCar = async (id) => {
	let result = await Car.findById(id).populate({ path: 'dono', select: 'nome login' }).exec();

	return result;
};

module.exports.FindByOwner = async (idDono) => {

	let result = await Car.find({ dono: idDono }).populate({ path: 'dono', select: 'nome idade' }).exec();

	return result;
};

module.exports.CreateCar = async (carro) => {

	let newCar = new Car();
	newCar.nome = carro.nome;
	newCar.marca = carro.marca;
	newCar.max_velo = carro.max_velo;
	newCar.dono = carro.dono;

	return newCar.save();
};

module.exports.UpdateCar = async (carro) => {

	let result = await Car.findOneAndUpdate({ _id: carro._id }, carro);

	return result;
};

module.exports.DeleteCar = async (id) => {

	let result = Car.deleteOne({ _id: id });

	return result;
};

