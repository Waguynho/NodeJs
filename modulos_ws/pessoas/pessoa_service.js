
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

module.exports.CreatePerson = async (pessoa) => {

    var novaPessoa = new Pessoa();

    novaPessoa.nome = pessoa.nome;
    novaPessoa.idade = pessoa.idade;
    novaPessoa.login = pessoa.login;
    novaPessoa.senha = hash.createHash(pessoa.senha);

    await novaPessoa.save(function (err, data) {
        if (err) {
            throw new Error(err);
        }
    })
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

module.exports.DeletePerson = async (id) => {
    
    Pessoa.findByIdAndRemove(id, function (err, pessoa) {

        if (err) {
           throw new Error(JSON.stringify(err));
        }

        if (err == null && pessoa == null) {

            throw new Error('Pessoa não existe!');            
        }

    })
}

