
var help_db = require('./pessoa_schema')

var Pessoa = help_db.Pessoa;

function GetPessoas(callback){
    Pessoa.find( function (err, pessoas) {
        if (err) {
            return console.log(err);
        }
        
        console.log("api/pessoas => Achou Pessoas");
        callback(pessoas);
    })           
}

function FindPessoa(id, callback){
     console.log("api/pessoas => Achou Pessoas");
}
function CreatePessoa(pessoa, callback){
    var novaPessoa = new Pessoa();

    novaPessoa.nome = pessoa.nome;
    novaPessoa.idade = pessoa.idade;

    novaPessoa.save( function (err, pessoas) {
        if (err) {
             callback(err, null);
             return
        }        
        console.log("Criou pessa");

        callback(false, novaPessoa);
    })       
}
function UpdatePessoa(pessoa, callback){

    Pessoa.findById(pessoa._id, function (err, pessoa_update) {
        if (err) {
            callback(err, null);
                return
        }  
        pessoa_update.nome = pessoa.nome;
        pessoa_update.idade = pessoa.idade;
        pessoa_update.save(callback);
    });
    
}

function DeletePessoa(id, callback){
   Pessoa.findByIdAndRemove(id, function (err, pessoa) {  
   
        if(err){
            callback(err, null);
            return;
        }

        if(err == null && pessoa == null){
            callback({erro: 'Pessoa não existe!'}, null);
            return;
        }

        var response = {
            message: "pessoa deletada com sucesso!",
            id: pessoa._id
        };
        callback(false, response);
    });
  
}

module.exports =  {
  GetPessoas: GetPessoas,
  FindPessoa: FindPessoa,
  CreatePessoa: CreatePessoa,
  UpdatePessoa: UpdatePessoa,
  DeletePessoa: DeletePessoa
}
