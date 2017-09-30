
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
  },

  login: {
    type: String,
    required: true,
    min: [3, 'Login deve ter pelo menos 3 caracters!'],
  },

  senha: {
    type: String,
    required: true,
    min: [6, 'Senha deve ter pelo menos 3 caracters!'],
  },


});

var Pessoa = help_db.mongoose.model('pessoas', PessoaSchema);

module.exports = {
  Pessoa: Pessoa
}