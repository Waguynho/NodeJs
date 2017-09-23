// Connection URL
 config = require('./Utils/config')

var mongoose =  require('mongoose');
mongoose.connect(config.dbConection, {
  useMongoClient: true 
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conectou ao mongoose');
});

module.exports = {
  mongoose:mongoose
}
