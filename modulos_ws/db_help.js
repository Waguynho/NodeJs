// Connection URL
var URLDB = 'mongodb://wagner:789789@ds139288.mlab.com:39288/carros_db';

var mongoose =  require('mongoose');
mongoose.connect(URLDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conectou ao mongoose');
});

module.exports = {
  mongoose:mongoose
}
