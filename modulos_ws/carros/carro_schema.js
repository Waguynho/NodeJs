
let helpDb = require('../db_help')
let Schema = helpDb.mongoose.Schema;

let CarSchema = helpDb.mongoose.Schema({
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

let Car = helpDb.mongoose.model('Carros', CarSchema);

module.exports = {
  Car:Car
}