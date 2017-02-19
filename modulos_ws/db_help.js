var MongoClient =  require('mongodb').MongoClient, Db = require('mongodb').Db, assert = require('assert'), MongoId = require('mongodb').ObjectID


// Connection URL
var URLDB = 'mongodb://wagner:789789@ds139288.mlab.com:39288/carros_db';

module.exports = {
  MongoClient:MongoClient,
  assert: assert,
  URLDB : URLDB,
  Db: Db,
  MongoId: MongoId
}
