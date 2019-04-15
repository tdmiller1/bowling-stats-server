var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://tdmiller7:Ker11lerbsu!@ds257579.mlab.com:57579/webapituckermillerdev"
var ObjectID = require('mongodb').ObjectID

/* GET games listing. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("webapituckermillerdev");
        dbo.collection("UserGames").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send({games: result});
            db.close();
        });
    });
});

/* GET games on id listing. */
router.get('/find', function(req, res, next) {
    const {id} = req.query;
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("webapituckermillerdev");
      var query = { playerId: id };
      dbo.collection("UserGames").find(query).toArray(function(err, result) {
        if (err) throw err;
          res.send({games:result});
          // console.log(result)
        db.close();
      });
    });
  });

  router.post('/add',function(req,res){
    console.log(req.body)
    const {id, score, date} = req.body;
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("webapituckermillerdev");
      var myobj = { playerId: id, score: score, date: date}
      dbo.collection("UserGames").insertOne(myobj, function(err, result) {
        if (err) console.log(err);
          res.send({response: result});
          
          updateProfile(url, id); 
        db.close();
      });
    });


})

router.delete('/',function(req, res){
  const {id, playerId} = req.body
  console.log(playerId)
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webapituckermillerdev");
    var myquery = { _id: ObjectID(id)};
    dbo.collection("UserGames").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log(obj);
      console.log(req.body.id)
      res.send("test")
      updateProfile(url, playerId);

      db.close();
    });
  });


})


function updateProfile(url, id){
  console.log(id)
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webapituckermillerdev");
    var query = { playerId: id };
    let sum = 0;
    let max = 0
    let average = 200;
    dbo.collection("UserGames").find(query).toArray(function(err, result) {
      for(var i = 0; i < result.length; i++){
        sum = result[i].score + sum
        if(result[i].score > max) max = result[i].score
      }
      average = parseInt(sum/result.length, 10)
      var myquery = { _id: id };
      var newvalues = { $set: {average: average, max: max } };
      console.log(newvalues)
      dbo.collection("player").updateOne(myquery, newvalues, function(err, result) {
          if (err) console.log(err);
          db.close();
        });
      });
    });
  }


module.exports = router;
