var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const { db: { username, password, host, port, name }} = config;

url = "mongodb://"
    +config.db.username
    +":"+config.db.password
    +"@"+config.db.host
    +":"+config.db.port
    +"/"+config.db.name

/* GET Info page. */
router.get('/info', function(req, res, next) {
  res.render('users', { title: 'users' });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webapituckermillerdev");
    dbo.collection("player").find({}).toArray(function(err, result) {
      if (err) throw err;
        res.send({users:result});
      db.close();
    });
  });
});

/* GET user on id listing. */
router.get('/find', function(req, res, next) {
  const {id} = req.query;
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webapituckermillerdev");
    var query = { _id: id };
    console.log("user on id")
    dbo.collection("player").find(query).toArray(function(err, result) {
      if (err) throw err;
        res.send({user:result});
      db.close();
    });
  });
});

/* GET user on id listing. */
router.get('/find/friends', function(req, res, next) {
  const {id} = req.query;
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webapituckermillerdev");
    var query = { _id: id };
    dbo.collection("player").find(query).toArray(function(err, result) {
      if (err) throw err;
        res.send({friends:result[0].friends});
      db.close();
    });
  });
});

/* INSERT user listing. */
router.get('/add', function(req, res, next) {
  const {id, name} = req.query;
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webapituckermillerdev");
    var myobj = { _id: id, playerName: name, average: 0, max: 0,friends:[]}
    dbo.collection("player").insertOne(myobj, function(err, result) {
      if (err) console.log(err);
        res.send({response: result});        
      db.close();
    });
  });
});

router.put('/update', function(req, res, next) {
  const {id, max, average, playerName} = req.query;
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webapituckermillerdev");
    var myquery = { _id: id };
    var newvalues = { $set: {average: average, max: max, playerName: playerName } };
    dbo.collection("player").updateOne(myquery, newvalues, function(err, result) {
      if (err) console.log(err);
        res.send({response: result});        
      db.close();
    });
  });
});

router.put('/add/friends', function(req, res, next) {
  const {id, friend} = req.query;
  if(friend.includes("@")){
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("webapituckermillerdev");
      var myquery = { _id: id };
      var newvalues = { $push: { friends: {"_id": friend} } };
      dbo.collection("player").updateOne(myquery, newvalues, function(err, result) {
        if (err) console.log(err);
        res.send({response: result});
        db.close();
      });
    });
  }
});

module.exports = router;
