
let help_db = require('../db_help')
let Schema = help_db.mongoose.Schema;
let CarroSchema = help_db.mongoose.Schema({
    nome: {
        type: String,
        required: true
      },  
       marca: {
        type: String,
        required: true
      },  
      
    max_velo: {
        type: Number,
        min: [0, 'Velocidade inválida! valor mínimo é zero.'],
        max: [500, 'Velocidade inválida! valor máximo é 500.'],
      },
      dono:  { type: Schema.Types.ObjectId, ref: 'pessoas' }
});


let Carro = help_db.mongoose.model('Carros', CarroSchema);

module.exports = {
  Carro:Carro
}