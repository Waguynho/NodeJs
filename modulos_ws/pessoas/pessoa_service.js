
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

module.exports.FindByCredentials = async (login, password) => {
    
        let cryptoPassWord = await hash.createHash(password);

       let result = await Pessoa.findOne({login: login, senha: cryptoPassWord},'nome idade' , function(err,obj) { 
          
           console.log(err); 
        });
    
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

module.exports.UpdatePessoa = async (pessoa) => {

    let response = null;
    let problema = false;

    await Pessoa.findById(pessoa._id, (err, pessoa_update) => {

        if (pessoa_update == null) {
            response = 'Não existe pessoa com este _id!';
            problema = true;
        } else {

            pessoa_update.nome = pessoa.nome;
            pessoa_update.idade = pessoa.idade;
            pessoa_update.login = pessoa.login;
            pessoa_update.senha = hash.createHash(pessoa.senha);
            response = pessoa_update.save();
        }
    })

    return handleResponseAsync(response, problema);

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

    return handleResponseAsync(response, problema);

}

function handleResponseAsync(response, problema) {
    if (problema) {

        throw new Error(response)
    } else {

        return response;
    }
}

