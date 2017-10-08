
const help_db = require('./pessoa_schema')

const hash = require('../Utils/hash')

const Pessoa = help_db.Pessoa;

module.exports.GetPersons = async () => {
    let result = await Pessoa.find();
    return result;
}

module.exports.FindPerson = async (id) => {

    result = await Pessoa.findById(id);

    return result;
}

module.exports.CreatePerson = async (pessoa, next) => {

    var novaPessoa = new Pessoa();

    novaPessoa.nome = pessoa.nome;
    novaPessoa.idade = pessoa.idade;
    novaPessoa.login = pessoa.login;
    novaPessoa.senha = hash.createHash(pessoa.senha);

     novaPessoa.save(function (err, data) {
        if (err) {
            next(err);
        }
        novaPessoa = data;
    });

    return novaPessoa; 
}

module.exports.UpdatePessoa = async (pessoa) => {

    Pessoa.findById(pessoa._id, function (err, pessoa_update) {

        if (err) {
            throw new Error(err);
        }
        if (pessoa_update == null) {
            throw new Error('Não existe uma pessoa com este _id!');
        }

        pessoa_update.nome = pessoa.nome;
        pessoa_update.idade = pessoa.idade;
        pessoa_update.login = pessoa.login;
        pessoa_update.senha = hash.createHash(pessoa.senha);

        pessoa_update.save();

    })

}

module.exports.DeletePerson = async (id, callback) => {
    
    let result = await Pessoa.findByIdAndRemove(id, {select: 'nome'} ,  (err, pessoa) => {

        if (err) {
            callback(err);
            return;
        }

        if ( pessoa == null) {

            callback('Não existe pessoa com este _id!');    
            return;   
        }
        callback(null);
    })   
}

