
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

    let novaPessoa = new Pessoa();

    novaPessoa.nome = pessoa.nome;
    novaPessoa.idade = pessoa.idade;
    novaPessoa.login = pessoa.login;

    novaPessoa.senha = hash.createHash(pessoa.senha);

    let newPerson = await novaPessoa.save();

    return newPerson;
}

module.exports.UpdatePessoa = async (pessoa, callback) => {

    Pessoa.findById(pessoa._id, (err, pessoa_update) => {


        if (err) {
            callback(err, null);
            return;
        }

        if (pessoa_update == null) {
            callback('Não existe pessoa com este _id!', null);
            return;
        }

        pessoa_update.nome = pessoa.nome;
        pessoa_update.idade = pessoa.idade;
        pessoa_update.login = pessoa.login;
        pessoa_update.senha = hash.createHash(pessoa.senha);

        pessoa_update.save();
        callback(null, pessoa_update);
    })

}

module.exports.DeletePerson = async (id) => {

    let response = null;
    let problema = false;

    await Pessoa.findByIdAndRemove(id, { select: 'nome' }, async (err, pessoa) => {

        if (pessoa == null) {

            response = 'Não existe pessoa com este _id!';
            problema = true;

        } else {
            response = 'registro deletado com sucesso!';
        }
    });

    if (problema) {
        
        throw new Error(response)
    } else {

        return response;
    }
}

