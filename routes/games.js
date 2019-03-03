var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://tdmiller7:Ker11lerbsu!@ds257579.mlab.com:57579/webapituckermillerdev"

/* GET games listing. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("webapituckermillerdev");
        var query = { playerName: "Mitch Lewis" };
        dbo.collection("history").find(query).toArray(function(err, result) {
            if (err) throw err;
            res.send({games : result[0].games});
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
        db.close();
      });
    });
  });

  router.get('/add', function(req, res, next) {
    const {id, score, date} = req.query;
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("webapituckermillerdev");
      var myobj = { playerId: id, score: score, date: date}
      dbo.collection("UserGames").insertOne(myobj, function(err, result) {
        if (err) console.log(err);
          res.send({response: result});
        db.close();
      });
    });
  });

module.exports = router;
