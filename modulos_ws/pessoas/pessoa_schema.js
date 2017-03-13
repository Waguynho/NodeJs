
var help_db = require('../db_help')

var PessoaSchema = help_db.mongoose.Schema({
    nome: {
        type: String,
        required: true
      },  
      
    idade: {
        type: Number,
        min: [0, 'Idade inválida! valor mínimo é zero.'],
        max: [150, 'Idade inválida! valor máximo é 150.'],
      }
});

var Pessoa = help_db.mongoose.model('pessoas', PessoaSchema);

module.exports = {
  Pessoa:Pessoa
}