var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// Connection URL
var URLDB = 'mongodb://wagner:789789@ds139288.mlab.com:39288/carros_db';

module.exports = {
  MongoClient:MongoClient,
  assert: assert,
  URLDB : URLDB
}
